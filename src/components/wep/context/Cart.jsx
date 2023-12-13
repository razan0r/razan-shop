import axios from 'axios';
import {createContext, useState} from 'react'
import { toast } from 'react-toastify';

export const CartContext=createContext(null);

export function CartContextProvider({children}){
 


const addToCartContext=async (productId) =>{
    try{
        const token=localStorage.getItem("userToken")
        const {data}=await axios.post(`${import.meta.env.VITE_API_URL}/cart`,
        {productId},
        {headers:{Authorization:`Tariq__${token}`}}
        )
        if(data.message=='success'){
            toast.success('added to cart succecfully', {
                position: "top-right",
                autoClose: false,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });}
        return data;
    }catch(error){
        console.log(error)
    }
}
const getCartContext=async ()=>{
    try{
        const token =localStorage.getItem('userToken');
        const{data}=await axios.get(`${import.meta.env.VITE_API_URL}/cart`,
        {headers: {Authorization:`Tariq__${token}`}})

        return data;
    }
    catch(error){console.log(error)}
}
const removeCartContext=async (productId)=>{
    try{
        const token=localStorage.getItem("userToken")
        const {data}=await axios.patch(`${import.meta.env.VITE_API_URL}/cart/removeItem`,{productId},
        {headers:{Authorization:`Tariq__${token}`}
    })

    return data;
    }catch(error){
        console.log(error);
    }
}

const clearCartContext = async () => {
    try {
        const token=localStorage.getItem("userToken")
      const response = await axios.patch(`${import.meta.env.VITE_API_URL}/cart/clear`, null, 
      {headers:{Authorization:`Tariq__${token}`}});

      console.log('Cart cleared successfully', response.data);
    } catch (error) {
      console.error('Error clearing the cart', error);
    }
  };

  const increaseQuantityContext  = async (productId) => {
    try {
    const token=localStorage.getItem("userToken")
      const response = await axios.patch(`${import.meta.env.VITE_API_URL}/cart/incraseQuantity`, {productId}, {
        headers: {
            Authorization:`Tariq__${token}`,
        },
      });
    } catch (error) {
      console.error('Error increasing quantity', error);
    }
  };


  const decreaseQuantityContext  = async (productId) => {
    try {
    const token=localStorage.getItem("userToken")
      const response = await axios.patch(`${import.meta.env.VITE_API_URL}/cart/decraseQuantity`, {productId}, {
        headers: {
            Authorization:`Tariq__${token}`,
        },
      });
    } catch (error) {
      console.error('Error increasing quantity', error);
    }
  };



    return <CartContext.Provider value={{addToCartContext,getCartContext,removeCartContext,clearCartContext,increaseQuantityContext,decreaseQuantityContext,}}>
        {children}
    </CartContext.Provider>
}