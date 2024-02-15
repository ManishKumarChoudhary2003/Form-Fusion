import React, { useState, useEffect } from "react";
import {
  deleteFormForUserApiService,
  deleteFormsForUserHasNoLinkApiService,
  retrieveAllFormsForUserApiService,
} from "../../api/FormApiService";
import Navbar from "../home/Navbar/Navbar";
import { Link, useNavigate } from "react-router-dom";

const AllForms = () => {
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!userId || !token) {
          throw new Error("User ID or token is missing");
        }
        const response = await retrieveAllFormsForUserApiService(userId, token);
        console.log("Response: -> ", response);
        const formattedData = response.map((form) => ({
          ...form,
          link: form.link === "null" ? null : form.link,
        }));
        const sortedData = formattedData.sort((a, b) => b.formId - a.formId);
        setFormData(sortedData);
        setLoading(false);
        await deleteFormsForUserHasNoLinkApiService(userId, token);
      } catch (error) {
        console.error("Error fetching form data: ->", error);
        setError(error.message || "An error occurred while fetching form data");
        setLoading(false);
      }
    };

    fetchData();
  }, [userId, token]);

  if (loading) {
    return (
      <div>
        <Navbar />
        <div className="container card mt-5 md-5">
          <div>Loading...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Navbar />
        <div className="container card mt-5 md-5">
          <div>Error: {error}</div>
        </div>
      </div>
    );
  }

  if (!Array.isArray(formData)) {
    return (
      <div>
        <Navbar />
        <div className="container card mt-5 md-5">
          <div>Data received from the server is not in the expected format</div>
        </div>
      </div>
    );
  }

  const updateForm = (formId) => {
    navigate(`/create-form/${formId}`);
  };
  const seeForm = (formId) => {
    navigate(`/all-questions/${formId}`);
  };

  const goToForm = (formId) => {
    navigate(`/form/${userId}/${formId}`);
  };

  const seeResponses = (formId) => {
    navigate(`/responses/${userId}/${formId}`);
  };

  const deleteForm = async (formId) => {
    await deleteFormForUserApiService(userId, formId, token);
    window.location.reload();
  };

  return (
    <div>
      <Navbar />
      <div
        className="container card mt-5 md-5"
        style={{ backgroundColor: "#e4ebfd" }}
      >
        {formData.length > 0 ? (
          <table className="table">
            <thead className="thead-dark">
              <tr>
                <th scope="col">Form ID</th>
                <th scope="col">Title</th>
                <th scope="col">Description</th>
                <th scope="col">Link</th>
                <th scope="col">Update</th>
                <th scope="col">Delete</th>
                <th scope="col">Responses</th>
              </tr>
            </thead>
            <tbody>
              {formData.map((form) => (
                <tr key={form.formId}>
                  <td>{form.formId}</td>
                  <td onClick={() => seeForm(form.formId)}>{form.title}</td>
                  <td onClick={() => seeForm(form.formId)}>
                    {form.description}
                  </td>
                  <td>
                    <Link onClick={() => goToForm(form.formId)}>
                      {form.link}
                    </Link>
                  </td>
                  <td>
                    <button onClick={() => updateForm(form.formId)}>
                      Update
                    </button>
                  </td>
                  <td>
                    <button onClick={() => deleteForm(form.formId)}>
                      Delete
                    </button>
                  </td>
                  <td>
                    <button onClick={() => seeResponses(form.formId)}>
                      Response
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div>No form data available</div>
        )}
      </div>
    </div>
  );
};

export default AllForms;
