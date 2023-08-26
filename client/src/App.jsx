import "./App.scss";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Cart from "./pages/cart/Cart";
import Home from "./pages/home/Home";
import Product from "./pages/product/Product";
import Navbar from "./components/navbar/Navbar";
import Error from "./pages/error/Error";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
  Outlet,
} from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/authContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import axios from "axios";
axios.defaults.withCredentials = true;

function App() {
  const client = new QueryClient();
  const { currentUser } = useContext(AuthContext);

  const Layout = () => {
    return (
      <div>
        <Navbar />
        <Outlet />
      </div>
    );
  };

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }
    return <>{children}</>;
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: (
            <QueryClientProvider client={client}>
              <Home currentUser={currentUser} />
            </QueryClientProvider>
          ),
        },
        {
          path: "/cart",
          element: (
            <ProtectedRoute>
              <QueryClientProvider client={client}>
                <Cart />
              </QueryClientProvider>
            </ProtectedRoute>
          ),
        },
        {
          path: "/product/:id",
          element: (
            <QueryClientProvider client={client}>
              <Product />
            </QueryClientProvider>
          ),
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    { path: "*", element: <Error /> },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
