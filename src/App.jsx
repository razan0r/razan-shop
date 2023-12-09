import {RouterProvider, createBrowserRouter} from "react-router-dom";
import Layout from "./Layouts/Layout.jsx";
import Register from "./components/wep/register/Register.jsx";
import Login from "./components/wep/login/Login.jsx";
import Home from "./components/wep/home/Home.jsx";
import Categories from "./components/wep/categories/Categories.jsx";
import HomeDashbord from './components/dashbord/home/Home.jsx';
import CategoriesDashbord from './components/dashbord/categories/Categories.jsx';
import DashbordLayout from './Layouts/DashboardLayout.jsx';
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import CategoriesDetails from "./components/wep/categories/CategoriesDetails.jsx";
import Product from "./components/wep/products/Product.jsx";
import { CartContextProvider } from "./components/wep/context/Cart.jsx";
import Cart from "./components/wep/cart/Cart.jsx";
import SendCode from "./components/password/SendCode.jsx";
import ForgetPassword from "./components/password/ForgetPassword.jsx";
import Profile from "./components/wep/profile/Profile.jsx";
import { ProfileContextProvider } from "./components/wep/context/Profile.jsx";



export default function App() {
const [user,setUser] =useState(null);

const saveCurrentUser = () => {
const token=localStorage.getItem("userToken");
const decoded=jwtDecode(token);
setUser(decoded);
}

useEffect(() => {
  if(localStorage.getItem("userToken")){
    saveCurrentUser();
  }
},[]);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout  user={user} setUser={setUser}/>,
      children: [
        {
            path: 'register',
            element: <Register />
          },
              {
            path: 'login',
            element: <Login saveCurrentUser={saveCurrentUser} />
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
        element:<Cart />
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
        element: <HomeDashbord />
      },
      {
        path: 'categories',
        element: <CategoriesDashbord />
      },{
        path: '*',
        element:<h2>404 page not found --- dashboard</h2>
      }
    ]
    }
  ]);
  
  return (
  <>
   <CartContextProvider>
        <RouterProvider router={router} />
      </CartContextProvider>

  </>
     

  );
  
}
