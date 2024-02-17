import React, { useState, useEffect } from "react";
import { retrieveAllResponsesApiService } from "../../api/ResponseApiService";
import { Table, Spinner, Alert } from "react-bootstrap";
import { useParams } from "react-router-dom";

const ResponseData = () => {
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { formId } = useParams();
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseData = await retrieveAllResponsesApiService(
          userId,
          formId,
          token
        );
        setResponses(responseData);
        setLoading(false);
      } catch (error) {
        setError("An error occurred while fetching responses");
        setLoading(false);
      }
    };

    fetchData();
  }, [userId, formId, token]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5">
        <Alert variant="danger">{error}</Alert>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Response Data</h2>
      {responses.length > 0 && (
        <div className="mb-4">
          <h3 className="text-center">{responses[0].form.title}</h3>
          <p className="text-center">{responses[0].form.description}</p>
        </div>
      )}
      <Table striped bordered hover className="mx-auto" style={{ maxWidth: "600px" }}>
        <thead>
          <tr>
            <th>Sr. No</th>
            <th>Response ID</th>
            <th>Date</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {responses.map((response, index) => {
            const timestamp = new Date(response.timestamp);
            const date = timestamp.toLocaleDateString();
            const time = timestamp.toLocaleTimeString();
            return (
              <tr key={response.responseId}>
                <td>{index + 1}</td>
                <td>{response.responseId}</td>
                <td>{date}</td>
                <td>{time}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default ResponseData;
