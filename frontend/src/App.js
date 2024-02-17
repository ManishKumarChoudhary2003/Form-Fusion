import { RouterProvider, createBrowserRouter } from "react-router-dom";
import LoginComponent from "./components/auth/LoginComponent";
import RegisterComponent from "./components/auth/RegisterComponent";
import AllForms from "./components/form/AllForms";
import Welcome from "./components/home/Welcome";
import ErrorPage from "./pages/Error";
import CreateForm from "./components/form/CreateForm";
import LogoutComponent from "./components/auth/LogoutComponent";
import CreateQuestion from "./components/question/CreateQuestion";
import AllQuestions from "./components/question/AllQuestions";
import UpdateQuestion from "./components/question/UpdateQuestion";
import Form from "./components/form/Form";
import Responses from "./components/responses/responses";
import ResponseData from "./components/responses/ResponseData";
import Layout from "./pages/Layout";
import CreateFormLayout from "./pages/CreateFormLayout";
import CreateQuestionsLayout from "./pages/CreateQuestionsLayout";
import AllQuestionsLayout from "./pages/AllQuestionsLayout";
import AllFormLayout from "./pages/AllFormLayout";
import ResponsesLayout from "./pages/ResponsesLayout";
import ResponseDataLayout from "./pages/ResponseDataLayout";
import LoginLayout from "./pages/LoginLayout";
import LogoutLayout from "./pages/LogoutLayout";
import RegisterLayout from "./pages/RegisterLayout";

const App = () => {
  // const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  // function AuthenticatedRoute({ children }) {
  //   if (isAuthenticated) return children;

  //   return <Navigate to="/" />;
  // }

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      // errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: <Welcome />,
        },
        {
          path: "user/:userId/all-forms",
          element: (
            <AllFormLayout>
              <AllForms />
            </AllFormLayout>
          ),
        },
        {
          path: "user/:userId/create-form",
          element: (
            <CreateFormLayout>
              <CreateForm />
            </CreateFormLayout>
          ),
        },
        {
          path: "user/:userId/create-form/:formId",
          element: (
            <CreateFormLayout>
              <CreateForm />
            </CreateFormLayout>
          ),
        },
        {
          path: "all-questions/:formId",
          element: (
            <AllQuestionsLayout>
              {" "}
              <AllQuestions />
            </AllQuestionsLayout>
          ),
        },
        {
          path: "user/:userId/create-question/:formId",
          element: (
            <CreateQuestionsLayout>
              <CreateQuestion />,
            </CreateQuestionsLayout>
          ),
        },
        {
          path: "user/:userId/update-question/:formId/:questionId",
          element: <UpdateQuestion />,
        },
       
        {
          path: "user/:userId/responses/:userId/:formId",
          element: (
            <ResponsesLayout>
              {" "}
              <Responses />
            </ResponsesLayout>
          ),
        },
        {
          path: "user/:userId/responses-details/:userId/:formId",
          element: (
            <ResponseDataLayout>
              {" "}
              <ResponseData />
            </ResponseDataLayout>
          ),
        },
        {
          path: "register",
          element: (
            <RegisterLayout>
              <RegisterComponent />
            </RegisterLayout>
          ),
        },
        {
          path: "login",
          element: (
            <LoginLayout>
              <LoginComponent />
            </LoginLayout>
          ),
        },
        {
          path: "logout",
          element: (
            <LogoutLayout>
              {" "}
              <LogoutComponent />
            </LogoutLayout>
          ),
        },
        {
          path: "*",
          element: <ErrorPage />,
        },
      ],
    }, {
      path: "/form/:userId/:formId",
      element: <Form />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
