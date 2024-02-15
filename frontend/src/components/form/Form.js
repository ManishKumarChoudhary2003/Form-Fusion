import React, { useState, useEffect } from "react";
import { retrieveAllQuestionsForFormApiService } from "../../api/QuestionApiService";
import { useNavigate, useParams } from "react-router-dom";
import { responseForFormApiService } from "../../api/ResponseApiService";
import { submitAnswerForQuestionForFormApiService } from "../../api/AnswerApiService";
import { Button, Modal } from "react-bootstrap";
import { retrieveFormForUserApiService } from "../../api/FormApiService";

const Form = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(null);
  const [error, setError] = useState(null);
  const [answers, setAnswers] = useState({});
  const [showModal, setShowModal] = useState(false);

  const { formId } = useParams();
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const formResponse = await retrieveFormForUserApiService(
          userId,
          formId,
          token
        );
        const questionsResponse = await retrieveAllQuestionsForFormApiService(
          userId,
          formId,
          token
        );
        setForm(formResponse);
        setQuestions(questionsResponse);
        setLoading(false);
      } catch (error) {
        setError(
          error.message ||
            "An error occurred while fetching form and questions data"
        );
        setLoading(false);
      }
    };

    fetchData();
  }, [userId, formId, token]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setShowModal(true);
  };

  const handleConfirmSubmit = async () => {
    try {
      await Promise.all(
        questions.map((question) =>
          submitAnswerForQuestionForFormApiService(
            userId,
            formId,
            question.questionId,
            { answer: answers[question.questionId] || "" }
          )
        )
      );

      await responseForFormApiService(userId, formId, token);
      setShowModal(false);
      navigate(-1);
    } catch (error) {
      console.error("Error submitting form:", error);
      return error;
    }
  };

  const handleAnswerChange = (questionId, value) => {
    setAnswers({ ...answers, [questionId]: value });
  };

  const handleClose = () => {
    setShowModal(false);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to submit the form?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleConfirmSubmit}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
      <form
        onSubmit={handleSubmit}
        className="container mt-5"
        style={{
          maxWidth: "500px",
          backgroundColor: "#f1f5fd",
          padding: "20px",
        }}
      >
        <div
          style={{ 
            marginBottom: "20px",
            border: "1px solid #6c757d", 
            padding: "10px",
          }}
        >
          <h1 style={{ color: "#3f30b4" }}>{form.title}</h1>
          <p style={{ color: "#909ac0" }}>{form.description}</p> 
        </div>

        {questions.map((question, index) => (
          <div key={question.questionId} className="mb-4">
            <p
              className="mb-3"
              style={{
                color: "#7D91D8",
                fontSize: "18px",
                fontWeight: "bold",
              }}
            >{`${index + 1}. ${question.text}`}</p>
            <div className="mb-3">
              {question.options.length === 0 ? (
                <input
                  style={{ maxWidth: "300px" }}
                  type="text"
                  className="form-control"
                  id={`answer-${question.questionId}`}
                  placeholder="Your answer here..."
                  required
                  value={answers[question.questionId] || ""}
                  onChange={(e) =>
                    handleAnswerChange(question.questionId, e.target.value)
                  }
                />
              ) : (
                question.options.map((option, i) => (
                  <div key={i} className="form-check">
                    {option.optionData ? (
                      <>
                        <input
                          className="form-check-input"
                          type="radio"
                          name={`answer-${question.questionId}`}
                          id={`option-${question.questionId}-${i}`}
                          value={option.optionData}
                          required
                          checked={
                            answers[question.questionId] === option.optionData
                          }
                          onChange={() =>
                            handleAnswerChange(
                              question.questionId,
                              option.optionData
                            )
                          }
                        />
                        <label
                          className="form-check-label"
                          htmlFor={`option-${question.questionId}-${i}`}
                        >
                          {option.optionData}
                        </label>
                      </>
                    ) : (
                      <input
                        style={{ maxWidth: "300px" }}
                        type="text"
                        className="form-control"
                        id={`answer-${question.questionId}`}
                        placeholder="Your answer here..."
                        required
                        value={answers[question.questionId] || ""}
                        onChange={(e) =>
                          handleAnswerChange(
                            question.questionId,
                            e.target.value
                          )
                        }
                      />
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        ))}
        <div className="d-grid gap-2  mx-auto">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
