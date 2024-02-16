import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import { useParams } from "react-router-dom";
import { retrieveAllQuestionsForFormApiService } from "../../api/QuestionApiService";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../home/Navbar/Navbar";

const Responses = () => {
  const { formId } = useParams();
  const [questions, setQuestions] = useState([]);
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(null);
  const [chartData, setChartData] = useState([]);

  const userId = localStorage.getItem("userId");
  // const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedQuestions = await retrieveAllQuestionsForFormApiService(
          userId,
          formId
        );
        setQuestions(fetchedQuestions);
        setChartData(
          fetchedQuestions.map((question) => ({
            seriesData: [],
            options: {
              chart: {
                width: 380,
                type: "pie",
              },
              labels: [],
              responsive: [
                {
                  breakpoint: 480,
                  options: {
                    chart: {
                      width: 200,
                    },
                    legend: {
                      position: "bottom",
                    },
                  },
                },
              ],
            },
          }))
        );
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchData();
  }, [userId, formId]);

  const handleShowChart = (index) => {
    if (selectedQuestionIndex === index) {
      // If the selected question is already shown, hide it
      setSelectedQuestionIndex(null);
    } else {
      setSelectedQuestionIndex(index);

      const selectedQuestion = questions[index];
      const updatedChartData = [...chartData];

      if (selectedQuestion) {
        const series = selectedQuestion.answers.reduce((acc, answer) => {
          const existingIndex = acc.findIndex(
            (item) => item.label === answer.answerData
          );
          if (existingIndex !== -1) {
            acc[existingIndex].value++;
          } else {
            acc.push({ label: answer.answerData, value: 1 });
          }
          return acc;
        }, []);
        const labels = series.map((item) => {
          // Include the number of occurrences on the right side of the label
          return `${item.label} (${item.value})`;
        });

        // Update the chart data for the selected question
        updatedChartData[index].seriesData = series.map((item) => item.value);
        updatedChartData[index].options.labels = labels;

        setChartData(updatedChartData);
      }
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container">
        <header
          className="mb-3 mx-auto"
          style={{
            backgroundColor: "#f8f9fa",
            padding: "40px 0",
            maxWidth: "600px",
          }}
        >
          <h1 className="text-center" style={{ color: "#3b6da2" }}>
            Form Responses
          </h1>
          <p
            className="lead text-center"
            style={{ color: "#5a6168", fontSize: "1.25rem" }}
          >
            View responses for each question
          </p>
        </header>
        {questions.map((question, index) => (
          <div
            key={question.questionId}
            className="card mb-3 mx-auto"
            style={{ maxWidth: "600px" }}
          >
            <div className="card-body d-flex justify-content-between align-items-center">
              <h5 className="card-title">{question.text}</h5>
              <button
                className="btn btn-primary"
                onClick={() => handleShowChart(index)}
              >
                {selectedQuestionIndex === index ? "Hide" : "Show"}
              </button>
            </div>
            {selectedQuestionIndex === index && (
              <div className="chart-container mt-3">
                {chartData[index].seriesData.length > 0 ? (
                  <ReactApexChart
                    options={chartData[index].options}
                    series={chartData[index].seriesData}
                    type="pie"
                    width={380}
                  />
                ) : (
                  <p className="text-danger">
                    No answers available for this question.
                  </p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Responses;
