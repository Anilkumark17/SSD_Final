import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./routes/AppLayout";
import Signup from "./pages/Signup.jsx";
import Login from "./pages/Login.jsx";
import ProtectedRouter from "./routes/ProtectedRouter.jsx";
import Dashboard from "./pages/Dashboard.jsx";

function App() {
  const router = createBrowserRouter([
    {
      element: <AppLayout />,
      children: [
        {
          path: "/signup",
          element: <Signup />,
        },
        {
          path: "/",
          element: <Login />,
        },
        {
          path: "/dashboard",
          element: (
            <ProtectedRouter>
              <Dashboard />
            </ProtectedRouter>
          ),
        },

        {
          path: "/test/dashboard/",
          element: <Dashboard />,
        },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
