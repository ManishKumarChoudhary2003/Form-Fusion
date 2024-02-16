import React, { useState, useEffect } from "react";
import { deleteQuestionForFormApiService, retrieveAllQuestionsForFormApiService } from "../../api/QuestionApiService";
import Navbar from "../home/Navbar/Navbar";
import { useNavigate, useParams } from "react-router-dom";

const AllQuestions = () => {
  const [questionsData, setQuestionsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  const { formId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!userId || !formId) {
          throw new Error("User ID, form ID is missing");
        }
        const response = await retrieveAllQuestionsForFormApiService(
          userId,
          formId
        );
        setQuestionsData(response);
        console.log("Response : ", response)
        setLoading(false);
      } catch (error) {
        console.error("Error fetching questions data:", error);
        setError(
          error.message || "An error occurred while fetching questions data"
        );
        setLoading(false);
      }
    };

    fetchData();
  }, [userId, formId]);

  if (loading) {
    return (
      <div>
        <Navbar />
        <div className="container card mt-5 md-5">
          <div>Loading...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Navbar />
        <div className="container card mt-5 md-5">
          {/* <div>Error: {error}</div> */}
          <div>No questions available for this form</div>
        </div>
      </div>
    );
  }

  if (!Array.isArray(questionsData)) {
    return (
      <div>
        <Navbar />
        <div className="container card mt-5 md-5">
          <div>Data received from the server is not in the expected format</div>
        </div>
      </div>
    );
  }

  const updateQuestion = (questionId) => {
    navigate(`/user/${userId}/update-question/${formId}/${questionId}`);
  };

  const deleteQuestion =  async (questionId) =>{
    await deleteQuestionForFormApiService(userId, formId, questionId, token)
    window.location.reload();
  }

  return (
    <div>
      <Navbar />
      <div className="container card mt-5 md-5">
        {questionsData.length > 0 ? (
          <div className="table-responsive">
            <table className="table table-striped table-bordered">
              <thead className="thead-dark">
                <tr>
                <th>Question Id</th>
                  <th>Question</th>
                  <th>Options</th>
                  <th>Update</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {questionsData.map((question, index) => (
                  <tr key={question.questionId}>
                  <td>{question.questionId}</td>
                    <td>{`Question ${index + 1}: ${question.text}`}</td>
                    <td>
                      {question.options.length > 0 ? (
                        <ul className="list-unstyled mb-0">
                          {question.options.map((option) => (
                            <li key={option.optionId}>{option.optionData}</li>
                          ))}
                        </ul>
                      ) : (
                        <p className="mb-0">No options available</p>
                      )}
                    </td>
                    <td>
                      <button onClick={() => updateQuestion(question.questionId)}>
                        Update
                      </button>
                    </td>
                    <td>
                      <button onClick={() => deleteQuestion(question.questionId)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div>No questions available for this form</div>
        )}
      </div>
    </div>
  );
};

export default AllQuestions;
