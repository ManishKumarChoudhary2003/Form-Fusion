import React, { useEffect, useState } from "react";
import {
  createFormForUserApiService,
  retrieveFormForUserApiService,
  updateFormForUserApiService,
} from "../../api/FormApiService";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../home/Navbar/Navbar";

const CreateForm = () => {
  // const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  const { formId } = useParams(); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await retrieveFormForUserApiService(
          userId,
          formId,
          token
        );
        // setForm(response);
        setTitle(response.title); 
        setDescription(response.description);  
        setLoading(false);
      } catch (error) {
        setError(
          error.message || "An error occurred while fetching form data"
        );
        setLoading(false);
      }
    };

    if (formId !== undefined) {
      fetchData();
    } else {
      setLoading(false);  
    }
  }, [userId, formId, token]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Current User Id", userId, " and is -->", token);
    try {
      const formData = { title, description };
      if (formId === undefined) {
        const createdForm = await createFormForUserApiService(
          userId,
          token,
          formData
        );
        setTitle("");
        setDescription("");
        console.log("Form id is -->>", createdForm.formId);
        navigate(`/create-question/${createdForm.formId}`);
        console.log("Form created successfully");
      } else {
        console.log(
          "user id -> ",
          userId,
          " token -> ",
          token,
          " form id -> ",
          formId
        );
        await updateFormForUserApiService(userId, formId, token, formData); 
        navigate("/all-forms");
      }
    } catch (error) {
      console.error("Error creating form:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <Navbar />
      <div className="container card mt-5 md-5">
        <h2>Create Form</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title:
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description:
            </label>
            <input
              type="text"
              className="form-control"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Create Form
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateForm;