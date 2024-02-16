import React, { useState, useEffect } from "react";
import { retrieveAllResponsesApiService } from "../../api/ResponseApiService";
import { Table } from "react-bootstrap";
import {Spinner, Alert} from "react-bootstrap";
import { useParams } from "react-router-dom";
import Navbar from "../home/Navbar/Navbar";

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
      <div>
        <Navbar />
        <div className="text-center"> 
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Navbar />
        <div className="container mt-5">
          <Alert variant="danger">{error}</Alert>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="container">
        <h2 className="text-center mb-4 mt-5">Response Data</h2>
        <div className="mb-4"> 
          <h3 className="text-center">{responses.length > 0 && responses[0].form.title}</h3>
          <p className="text-center">{responses.length > 0 && responses[0].form.description}</p>
        </div>
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
    </div>
  );
  
};

export default ResponseData;
