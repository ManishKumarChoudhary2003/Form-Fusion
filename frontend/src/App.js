import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import LoginComponent from "./components/auth/LoginComponent";
import RegisterComponent from "./components/auth/RegisterComponent"; 
import { useSelector } from "react-redux";
import AllForms from "./components/form/AllForms"; 
import Welcome from "./components/home/Welcome";

const App = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  function AuthenticatedRoute({ children }) {
    if (isAuthenticated) return children;

    return <Navigate to="/" />;
  }

  const router = createBrowserRouter([
    {
      path: "/", 
      children: [
        {
          index: true,
          element: <Welcome />,
        },
        {
          path: "all-forms",
          element: (
            <AuthenticatedRoute>
              <AllForms />
            </AuthenticatedRoute>
          ),
        },
        {
          path: "register",
          element: <RegisterComponent />,
        },
        {
          path: "login",
          element: <LoginComponent />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
