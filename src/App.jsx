import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./components/layout/Layout";
import DashboardPage from "./pages/DashboardPage";
// import ProductPage from "./pages/ProductPage";
import Categories_page from "./pages/Categories_page";
import CustomersPage from "./pages/CustomersPage";
import OrdersPage from "./pages/OrdersPage";
import Login from "./pages/Login";
import Product from "./components/product/Product";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
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
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;