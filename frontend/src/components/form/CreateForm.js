import React, { useEffect, useState } from "react";
import {
  createFormForUserApiService,
  retrieveFormForUserApiService,
  updateFormForUserApiService,
} from "../../api/FormApiService";
import { useNavigate, useParams } from "react-router-dom";
import { Spinner, Alert, Form, Button } from "react-bootstrap";

const CreateForm = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [showAddQuestionButton, setShowAddQuestionButton] = useState(false);
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
        setTitle(response.title);
        setDescription(response.description);
        setLoading(false);
      } catch (error) {
        setError(error.message || "An error occurred while fetching form data");
        setLoading(false);
      }
    };

    if (formId !== undefined) {
      setShowAddQuestionButton(true);
      fetchData();
    } else {
      setLoading(false);
    }
  }, [userId, formId, token]);

  const handleSubmit = async (event) => {
    event.preventDefault();
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
        navigate(`/user/${userId}/create-question/${createdForm.formId}`);
      } else {
        await updateFormForUserApiService(userId, formId, token, formData);
        navigate(`/user/${userId}/all-forms`);
      }
    } catch (error) {
      console.error("Error creating form:", error);
    }
  };

  if (loading) {
    return (
      <div className="text-center">
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

  const addQuestions = () => {
    if (formId === undefined) {
      navigate(`/user/${userId}/create-question`);
    } else {
      navigate(`/user/${userId}/create-question/${formId}`);
    }
  };

  return (
    <div className="container mt-5 mb-5 border-0 shadow" style={{ width: "80%", margin: "auto" }}>
      <div className="card p-4" style={{ maxWidth: "800px", margin: "auto", position: "relative" }}>
        <h2 className="mb-4">Create Form</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </Form.Group>
  
          <Form.Group className="mb-5" controlId="formDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text" 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </Form.Group>
  
          <Button
            className="ml-3"
            variant="primary"
            type="submit"
            style={{
              width: "auto",
              position: "absolute",
              bottom: "10px",
              left: showAddQuestionButton ? "calc(50% + 60px)" : "10px", 
              padding: "0.375rem 0.75rem",
              fontSize: "0.875rem",
              lineHeight: "1.5",
            }}
          >
            {formId === undefined ? "Add Questions" : "Update"}
          </Button>
  
          {showAddQuestionButton && (
            <Button
              className="mt-3"
              variant="info"
              onClick={addQuestions}
              style={{
                width: "auto",
                position: "absolute",
                bottom: "10px",
                left: "10px",
                padding: "0.375rem 0.75rem",
                fontSize: "0.875rem",
                lineHeight: "1.5",
              }}
            >
              Add Questions
            </Button>
          )}
        </Form>
      </div>
    </div>
  );
  
};

export default CreateForm;




// import React, { useEffect, useState } from "react";
// import {
//   createFormForUserApiService,
//   retrieveFormForUserApiService,
//   updateFormForUserApiService,
// } from "../../api/FormApiService";
// import { useNavigate, useParams } from "react-router-dom";
// import { Spinner, Alert } from "react-bootstrap";

// const CreateForm = () => {
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [showAddQuestionButton, setShowAddQuestionButton] = useState(false);
//   const navigate = useNavigate();
//   const userId = localStorage.getItem("userId");
//   const token = localStorage.getItem("token");
//   const { formId } = useParams();

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await retrieveFormForUserApiService(
//           userId,
//           formId,
//           token
//         );
//         setTitle(response.title);
//         setDescription(response.description);
//         setLoading(false);
//       } catch (error) {
//         setError(error.message || "An error occurred while fetching form data");
//         setLoading(false);
//       }
//     };

//     if (formId !== undefined) {
//       setShowAddQuestionButton(true);
//       fetchData();
//     } else {
//       setLoading(false);
//     }
//   }, [userId, formId, token]);

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     try {
//       const formData = { title, description };
//       if (formId === undefined) {
//         const createdForm = await createFormForUserApiService(
//           userId,
//           token,
//           formData
//         );
//         setTitle("");
//         setDescription("");
//         navigate(`/user/${userId}/create-question/${createdForm.formId}`);
//       } else {
//         await updateFormForUserApiService(userId, formId, token, formData);
//         navigate(`/user/${userId}/all-forms`);
//       }
//     } catch (error) {
//       console.error("Error creating form:", error);
//     }
//   };

//   if (loading) {
//     return (
//       <div>
//         <div className="text-center">
//           <Spinner animation="border" role="status">
//             <span className="visually-hidden">Loading...</span>
//           </Spinner>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div>
//         <div className="container mt-5">
//           <Alert variant="danger">{error}</Alert>
//         </div>
//       </div>
//     );
//   }

//   const addQuestions = () => {
//     if (formId === undefined) {
//       navigate(`/user/${userId}/create-question`);
//     } else {
//       navigate(`/user/${userId}/create-question/${formId}`);
//     }
//   };

//   return (
//     <div>
//       <div
//         className="container card mt-5 md-5"
//         style={{ backgroundColor: "#e4ebfd", maxWidth: "600px" }}
//       >
//         <h2>Create Form</h2>
//         <form onSubmit={handleSubmit}>
//           <div className="mb-3">
//             <label htmlFor="title" className="form-label">
//               Title:
//             </label>
//             <input
//               type="text"
//               className="form-control"
//               id="title"
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//               required
//             />
//           </div>
//           <div className="mb-3">
//             <label htmlFor="description" className="form-label">
//               Description:
//             </label>
//             <input
//               type="text"
//               className="form-control"
//               id="description"
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//               required
//             />
//           </div>
//           <button type="submit" className="btn btn-primary">
//             Create Form
//           </button>
//         </form>
//         {showAddQuestionButton && (
//           <button
//             onClick={addQuestions}
//             className="btn btn-info mt-2"
//             style={{ maxWidth: "150px" }}
//           >
//             Add Questions
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CreateForm;
