import React, { useState, useEffect } from "react";
import {
  deleteQuestionForFormApiService,
  retrieveAllQuestionsForFormApiService,
} from "../../api/QuestionApiService";
import { useNavigate, useParams } from "react-router-dom";
import { Spinner, Dropdown, Card, Alert } from "react-bootstrap";

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
          throw new Error("User ID or form ID is missing");
        }
        const response = await retrieveAllQuestionsForFormApiService(
          userId,
          formId
        );
        setQuestionsData(response);
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

  const updateQuestion = (questionId) => {
    navigate(`/user/${userId}/update-question/${formId}/${questionId}`);
  };

  const deleteQuestion = async (questionId) => {
    await deleteQuestionForFormApiService(userId, formId, questionId, token);
    window.location.reload();
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">All Questions</h2>
      {loading ? (
        <div className="text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : error ? (
        <div className="container mt-5 text-center">
          <div className="text-danger">
            <p>
              <Alert variant="danger">
                No questions available for this form
              </Alert>
            </p>
          </div>
        </div>
      ) : !Array.isArray(questionsData) ? (
        <div className="container mt-5 text-center">
          <div>Data received from the server is not in the expected format</div>
        </div>
      ) : (
        <div className="row row-cols-1 row-cols-md-4 g-4">
          {questionsData.map((question, index) => (
            <div key={question.questionId} className="col mb-4">
              <Card className="h-100">
                <Card.Body>
                  <Card.Title>
                    {index + 1}. {question.text}
                  </Card.Title>
                  {question.options.length > 0 ? (
                    <ul className="list-unstyled mb-0">
                      {question.options.map((option) => (
                        <li key={option.optionId}>{option.optionData}</li>
                      ))}
                    </ul>
                  ) : (
                    <p>No options available</p>
                  )}
                </Card.Body>
                <Card.Footer className="text-end">
                  <Dropdown>
                    <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                      more
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item
                        onClick={() => updateQuestion(question.questionId)}
                      >
                        Update Question
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => deleteQuestion(question.questionId)}
                      >
                        Delete Question
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </Card.Footer>
              </Card>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllQuestions;

// import React, { useState, useEffect } from "react";
// import {
//   deleteQuestionForFormApiService,
//   retrieveAllQuestionsForFormApiService,
// } from "../../api/QuestionApiService";
// import { useNavigate, useParams } from "react-router-dom";
// import { Spinner } from "react-bootstrap";

// const AllQuestions = () => {
//   const [questionsData, setQuestionsData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const token = localStorage.getItem("token");
//   const userId = localStorage.getItem("userId");
//   const { formId } = useParams();
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         if (!userId || !formId) {
//           throw new Error("User ID, form ID is missing");
//         }
//         const response = await retrieveAllQuestionsForFormApiService(
//           userId,
//           formId
//         );
//         setQuestionsData(response);
//         console.log("Response : ", response);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching questions data:", error);
//         setError(
//           error.message || "An error occurred while fetching questions data"
//         );
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [userId, formId]);

//   if (loading) {
//     return (
//       <div>
//         <div className="text-center">
//           <Spinner animation="border" role="status">
//             <span className="visually-hidden">Loading...</span>
//           </Spinner>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div>
//         <div className="container mt-5 text-center">
//           <div className="text-danger">
//             No questions available for this form
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (!Array.isArray(questionsData)) {
//     return (
//       <div>
//         <div className="container card mt-5 md-5">
//           <div>Data received from the server is not in the expected format</div>
//         </div>
//       </div>
//     );
//   }

//   const updateQuestion = (questionId) => {
//     navigate(`/user/${userId}/update-question/${formId}/${questionId}`);
//   };

//   const deleteQuestion = async (questionId) => {
//     await deleteQuestionForFormApiService(userId, formId, questionId, token);
//     window.location.reload();
//   };

//   return (
//     <div>
//       <div className="container card mt-5 md-5">
//         {questionsData.length > 0 ? (
//           <div className="table-responsive">
//             <table className="table table-striped table-bordered">
//               <thead className="thead-dark">
//                 <tr>
//                   <th>Sr. No</th>
//                   <th>Question Id</th>
//                   <th>Question</th>
//                   <th>Options</th>
//                   <th>Update</th>
//                   <th>Delete</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {questionsData.map((question, index) => (
//                   <tr key={question.questionId}>
//                     <td>{index + 1}</td>
//                     <td>{question.questionId}</td>
//                     <td>{`Question ${index + 1}: ${question.text}`}</td>
//                     <td>
//                       {question.options.length > 0 ? (
//                         <ul className="list-unstyled mb-0">
//                           {question.options.map((option) => (
//                             <li key={option.optionId}>{option.optionData}</li>
//                           ))}
//                         </ul>
//                       ) : (
//                         <p className="mb-0">No options available</p>
//                       )}
//                     </td>
//                     <td>
//                       <button
//                         onClick={() => updateQuestion(question.questionId)}
//                       >
//                         Update
//                       </button>
//                     </td>
//                     <td>
//                       <button
//                         onClick={() => deleteQuestion(question.questionId)}
//                       >
//                         Delete
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         ) : (
//           <div>No questions available for this form</div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AllQuestions;
