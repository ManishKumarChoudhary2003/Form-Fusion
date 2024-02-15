import React, { useState } from "react";
import { createQuestionForFormApiService } from "../../api/QuestionApiService";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../home/Navbar/Navbar";
import AllQuestions from "./AllQuestions";
import { setFormLinkForFormApiService } from "../../api/FormApiService";

const CreateQuestion = () => {
  const [questionText, setQuestionText] = useState("");
  const [options, setOptions] = useState([""]);
  const [showForm, setShowForm] = useState(false);
  const [showQuestions, setShowQuestions] = useState(false);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

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
      setShowForm(false);
      console.log("Question created successfully");
    } catch (error) {
      console.error("Error creating question:", error);
    }
  };

  const generateFormLink = async () => {
    try {
      console.log("Token -> ", token, " user Id -> ", userId);
      await setFormLinkForFormApiService(userId, formId, token);
      console.log("Token -> ", token, " user Id -> ", userId);
      navigate("/all-forms");
    } catch (error) {
      console.error("Error generating form link:", error);
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

  const removeOption = (index) => {
    const newOptions = [...options];
    newOptions.splice(index, 1);
    setOptions(newOptions);
  };

  const display = () => {
    setShowQuestions(!showQuestions);
  };

  return (
    <div>
      <Navbar />
      <div className="container card mt-5 md-5" style={{backgroundColor : "#e7e7fb", maxWidth : "600px"}}>
        <h2>Create Question</h2>
        <button
          type="button"
          className="btn btn-primary mb-3"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "Hide Form" : "Add Question"}
        </button>
        {showForm && (
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
                      Add
                    </button>
                  )}
                  {index !== options.length - 1 && (
                    <button
                      type="button"
                      className="btn btn-outline-danger"
                      onClick={() => removeOption(index)}
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
            </div>
            <button type="submit" className="btn btn-primary">
              Create Question
            </button>
          </form>
        )}
        <button onClick={display} className="btn btn-secondary">
          Show Questions
        </button>
        <button onClick={generateFormLink} className="btn btn-secondary">
          Generate Form Link
        </button>
      </div>
      {showQuestions && <AllQuestions />}
    </div>
  );
};

export default CreateQuestion;
