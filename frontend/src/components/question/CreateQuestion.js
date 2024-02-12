import React, { useState } from "react";
import { createQuestionForFormApiService } from "../../api/QuestionApiService";
import { useParams } from "react-router-dom";
import Navbar from "../home/Navbar/Navbar";

const CreateQuestion = () => {
  const [questionText, setQuestionText] = useState("");
  const [options, setOptions] = useState([""]);
  const token = localStorage.getItem("token");

  const { formId } = useParams();
  const userId = localStorage.getItem("userId");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      let question = {
        text: questionText,
      };

      if (options.length > 0) {
        question.options = options.map((option) => ({ optionData: option }));
      }

      await createQuestionForFormApiService(userId, formId, question, token);
      setQuestionText("");
      setOptions([""]);
      console.log("Question created successfully");
    } catch (error) {
      console.error("Error creating question:", error);
    }
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const addOption = () => {
    setOptions([...options, ""]);
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
          <div className="mb-3">
            <label className="form-label">Options:</label>
            {options.map((option, index) => (
              <div key={index} className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  value={option}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                />
                {index === options.length - 1 && (
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={addOption}
                  >
                    +
                  </button>
                )}
              </div>
            ))}
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
