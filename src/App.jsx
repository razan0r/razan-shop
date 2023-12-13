import {RouterProvider, createBrowserRouter} from "react-router-dom";
import { CartContextProvider } from "./components/wep/context/Cart.jsx";
import UserContextProvider, { UserContext } from "./components/wep/context/User.jsx";
import {router} from "./Layouts/Routes.jsx"
import { useContext, useEffect } from "react";


export default function App() {
  let {setUserToken}=useContext(UserContext)

  useEffect(()=>{
    if(localStorage.getItem("userToken") != null){
      setUserToken(localStorage.getItem("userToken")) 
    }
  },[])


  return (
  <>
       <CartContextProvider>
        <RouterProvider router={router} />
      </CartContextProvider>


  </>
     

  );
  
}
