import React, { useState, useEffect } from 'react';
import { retrieveQuestionForFormApiService } from '../../api/QuestionApiService';
import { retrieveAnswersForQuestionForFormApiService } from '../../api/AnswerApiService';
import { Pie } from 'react-chartjs-2'; 
import { useParams } from 'react-router-dom';

const Responses = () => {
  const [question, setQuestion] = useState('');
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  const { formId, questionId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const questionData = await retrieveQuestionForFormApiService(userId, formId, questionId, token);
        setQuestion(questionData.question);

        const answersData = await retrieveAnswersForQuestionForFormApiService(userId, formId, questionId);
        setAnswers(answersData);
        setLoading(false);
      } catch (error) {
        console.error('Error retrieving question and answers:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [userId, formId, questionId, token]);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <h2>Question: {question}</h2>
          <div style={{ width: '400px', margin: 'auto' }}>
            <Pie
              data={{
                labels: answers.map(answer => answer.answer),
                datasets: [
                  {
                    data: answers.map(answer => answer.count),
                    backgroundColor: [
                      'rgba(255, 99, 132, 0.6)',
                      'rgba(54, 162, 235, 0.6)',
                      'rgba(255, 206, 86, 0.6)',
                      'rgba(75, 192, 192, 0.6)',
                      'rgba(153, 102, 255, 0.6)',
                      'rgba(255, 159, 64, 0.6)'
                    ],
                    borderColor: [
                      'rgba(255, 99, 132, 1)',
                      'rgba(54, 162, 235, 1)',
                      'rgba(255, 206, 86, 1)',
                      'rgba(75, 192, 192, 1)',
                      'rgba(153, 102, 255, 1)',
                      'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                  }
                ]
              }}
              options={{
                responsive: true,
                legend: {
                  position: 'right'
                }
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Responses;
