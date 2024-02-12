import React, { useState } from "react";
import { createQuestionForFormApiService } from "../../api/QuestionApiService";
import { useParams } from "react-router-dom";
import Navbar from "../home/Navbar/Navbar";

const CreateQuestion = () => {
  const [questionText, setQuestionText] = useState("");
//   const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const { formId } = useParams();
  const userId = localStorage.getItem("userId");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const question = { text: questionText };
      await createQuestionForFormApiService(userId, formId, question, token);
      setQuestionText("");
    //   navigate(`/form/${formId}`); 
      console.log("Question created successfully");
    } catch (error) {
      console.error("Error creating question:", error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container card mt-5 md-5">
        <h2>Create Question</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="questionText" className="form-label">
              Question Text:
            </label>
            <input
              type="text"
              className="form-control"
              id="questionText"
              value={questionText}
              onChange={(e) => setQuestionText(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Create Question
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateQuestion;
