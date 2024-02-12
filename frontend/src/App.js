import { 
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import LoginComponent from "./components/auth/LoginComponent";
import RegisterComponent from "./components/auth/RegisterComponent";
// import { useSelector } from "react-redux";
import AllForms from "./components/form/AllForms";
import Welcome from "./components/home/Welcome";
import ErrorPage from "./pages/Error";
import CreateForm from "./components/form/CreateForm";
import LogoutComponent from "./components/auth/LogoutComponent";
import CreateQuestion from "./components/question/CreateQuestion";

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
          path: "all-forms",
          element: <AllForms />,
        },
        {
          path: "create-form",
          element: <CreateForm />,
        },
        {
          path : "create-question/:formId",
          element : <CreateQuestion />
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
        },{
          path : "error",
          element : <ErrorPage />
        }
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
