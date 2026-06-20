import { RouterProvider,createBrowserRouter } from "react-router-dom"
import Layout from "./components/layout/Layout"
import LoginPage from "./pages/LoginPage"
import DashboardPage from "./pages/DashboardPage"
import ProductPage from "./pages/ProductPage"
import Categories_page from "./pages/Categories_page"
import CustomersPage from "./pages/CustomersPage"
import OrdersPage from "./pages/OrdersPage"

const router = createBrowserRouter([
  {
    Path:"/",
    element:<Layout/>,
    children:[
      {
        index:true,
        element:<LoginPage/>
      },
      {
        path:"/dashboard",
        element:<DashboardPage/>
      },
      {
        path:"/product",
        element:<ProductPage/>
      },
      {
        path:"/categories",
        element:<Categories_page/>
      },
      {
        path:"/customers",
        element:<CustomersPage/>
      },
      {
        path:"/orders",
        element:<OrdersPage/>
      }
    ]
  }


])

function App() {
  return <RouterProvider router={router}/>
}

export default App;