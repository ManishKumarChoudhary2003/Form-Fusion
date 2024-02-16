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

const App = () => {
  // const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  // function AuthenticatedRoute({ children }) {
  //   if (isAuthenticated) return children;

  //   return <Navigate to="/" />;
  // }

  const router = createBrowserRouter([
    {
      path: "/",
      // errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: <Welcome />,
        },
        {
          path: "user/:userId/all-forms",
          element: <AllForms />,
        },
        { path: "user/:userId/create-form", element: <CreateForm /> },
        {
          path: "user/:userId/create-form/:formId",
          element: <CreateForm />,
        },
        {
          path: "all-questions/:formId",
          element: <AllQuestions />,
        },
        {
          path: "user/:userId/create-question/:formId",
          element: <CreateQuestion />,
        },
        {
          path: "user/:userId/update-question/:formId/:questionId",
          element: <UpdateQuestion />,
        },{
          path: "form/:userId/:formId",
          element: <Form />,
        },{
          path: "user/:userId/responses/:userId/:formId",
          element: <Responses />,
        },{
          path: "user/:userId/responses-details/:userId/:formId",
          element:  <ResponseData />,
        },
        {
          path: "register",
          element: <RegisterComponent />,
        },
        {
          path: "login",
          element: <LoginComponent />,
        },
        {
          path: "logout",
          element: <LogoutComponent />,
        },
        {
          path: "error",
          element: <ErrorPage />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
