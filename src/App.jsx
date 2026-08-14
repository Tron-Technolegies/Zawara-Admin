import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./components/layout/Layout";
import DashboardPage from "./pages/DashboardPage";
import Categories_page from "./pages/Categories_page";
import CustomersPage from "./pages/CustomersPage";
import OrdersPage from "./pages/OrdersPage";
import Product from "./components/product/Product";
import LoginPage from "./pages/LoginPage";
import AdminProtectedRoute from "./pages/AdminProtectedRoute";
import Coupons from "./components/Coupons/Coupons";
import SalesHistory from "./pages/SalesHistory";


const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },

  {
    element: <AdminProtectedRoute />,
    children: [
      {
        path: "/",
        element: <Layout />,
        children: [
          {
            path: "dashboard",
            element: <DashboardPage />,
          },
          {
            path: "product",
            element: <Product />,
          },
          {
            path: "categories",
            element: <Categories_page />,
          },
          {
            path: "customers",
            element: <CustomersPage />,
          },
          {
            path: "orders",
            element: <OrdersPage />,
          },
          {
            path: "saleshistory",
            element: <SalesHistory />,
          },
          {
            path: "coupons",
            element: <Coupons />
          },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;