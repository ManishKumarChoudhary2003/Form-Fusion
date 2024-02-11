import React, { useState } from "react";
import { createFormForUserApiService } from "../../api/FormApiService";
import { useSelector } from "react-redux";

const CreateForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");


  const token = useSelector((state) => state.auth.token);
  const userId = useSelector((state) => state.auth.userId);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const form = { title, description };
      await createFormForUserApiService(userId, token, form);
      // Optionally, you can perform additional actions after form creation
      console.log("Form created successfully");
    } catch (error) {
      console.error("Error creating form:", error);
      // Handle error
    }
    setTitle("")
    setDescription("")
  };

  return (
    <div className="container card mt-5 md-5">
      <h2>Create Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title:</label>
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
          <label htmlFor="description" className="form-label">Description:</label>
          <textarea
            className="form-control"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Create Form</button>
      </form>
    </div>
  );
};

export default CreateForm;
