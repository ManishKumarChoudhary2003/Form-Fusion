import React, { useState } from "react";
import { createFormForUserApiService } from "../../api/FormApiService";
import { useNavigate } from "react-router-dom";
import Navbar from "../home/Navbar/Navbar";

const CreateForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Current User Id", userId, " and is -->", token);
    try {
      const form = { title, description };
      const createdForm = await createFormForUserApiService(userId, token, form);
      setTitle("");
      setDescription("");
      console.log("Form id is -->>", createdForm.formId);
      navigate(`/create-question/${createdForm.formId}`); 
      console.log("Form created successfully");
    } catch (error) {
      console.error("Error creating form:", error);
    }
  };

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
            <textarea
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










// import React, { useState } from "react";
// import { createFormForUserApiService } from "../../api/FormApiService";
// import { useNavigate } from "react-router-dom";
// import Navbar from "../home/Navbar/Navbar";

// const CreateForm = () => {
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");

//   const navigate = useNavigate();
//   const userId = localStorage.getItem("userId");
//   const token = localStorage.getItem("token");

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     console.log("Current User Id", userId, " and is -->", token);
//     try {
//       const form = { title, description };
//       await createFormForUserApiService(userId, token, form);
//       setTitle("");
//       setDescription("");
//       navigate("/");
//       console.log("Form created successfully");
//     } catch (error) {
//       console.error("Error creating form:", error);
//     }
//   };

//   return (
//     <div>
//       <Navbar />
//       <div className="container card mt-5 md-5">
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
//             <textarea
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
//       </div>
//     </div>
//   );
// };

// export default CreateForm;
