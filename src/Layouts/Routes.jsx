import { createBrowserRouter} from "react-router-dom";
import Layout from "./Layout";
import Home from "../components/wep/home/Home";
import DashbordLayout from './DashboardLayout.jsx';
import Categories from "../components/wep/categories/Categories.jsx";
import HomeDashbord from '../components/dashbord/home/Home.jsx'
import CategoriesDashbord from '../components/dashbord/categories/Categories.jsx'
import Register from "../components/wep/register/Register.jsx";
import Login from "../components/wep/login/Login.jsx";
import Cart from "../components/wep/cart/Cart.jsx";
import Product from "../components/wep/products/Product.jsx";
import ForgetPassword from "../components/password/ForgetPassword.jsx";
import SendCode from "../components/password/SendCode.jsx";
import Profile from "../components/wep/profile/Profile.jsx";
import { ProfileContextProvider } from "../components/wep/context/Profile.jsx";
import CategoriesDetails from './../components/wep/categories/CategoriesDetails';
import ProtectedRoute from "../components/wep/protectedRoute/ProtectedRoute.jsx";
import CreateOrder from "../components/wep/cart/createOrder.jsx";

export  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
            path: 'register',
            element: <Register />
          },
              {
            path: 'login',
            element: 
            <Login  />
          },{
            path: 'profile',
            element:<ProfileContextProvider><Profile /></ProfileContextProvider> 
          },  {
            path: 'sendcode',
            element: <SendCode />
          },
          {
            path: 'forgetpassword',
            element: <ForgetPassword />
          },{
       //index:true,
        path: '/',
        element: <Home />
      },
      {
        path: 'categories',
        element: <Categories />
      },{
        path: '/products/category/:categoryId',
        element:<CategoriesDetails />
      },{
        path: '/products/:productId',
        element:<Product />
      },{
        path: 'cart',
        element:
        <ProtectedRoute>
            <Cart />
        </ProtectedRoute>
      },{
        path: 'createOrder',
        element:<CreateOrder/>
      },{
        path: '*',
        element:<h2>404 page not found --- wep</h2>
      }
    ]
    },
    {
      path: '/dashboard',
      element: <DashbordLayout />,
      children: [{
        path: 'home',
        //element: <HomeDashbord />
      },
      {
        path: 'categories',
       // element: <CategoriesDashbord />
      },{
        path: '*',
        element:<h2>404 page not found --- dashboard</h2>
      }
    ]
    }
  ]);
  