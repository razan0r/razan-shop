import axios from 'axios';
import React, { useContext } from 'react'
import {useParams} from 'react-router-dom'
import { useQuery } from 'react-query';
import ReactImageMagnify from 'react-image-magnify';
import { CartContext } from '../context/Cart';


export default function Product() {
    const {productId}=useParams();
    const {addToCartContext}=useContext(CartContext)

    const getProduct= async ()=>{
        const {data}=await axios.get(`${import.meta.env.VITE_API_URL}/products/${productId}`);
        return data.product;
    }

    const {data,isLoading}=useQuery('Product',getProduct);
    
    if(isLoading){
        return <p>Loading...</p>
    }

    const addToCart=async (productId)=>{
      const res=await addToCartContext(productId)
      console.log(res)
    }

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-lg-4'> 

        </div>
        <div className='col-lg-8'> 
        <h2>{data.name}</h2>
        <p>{data.price}</p>
        <button className='btn btn-outline-info' onClick={()=>addToCart(data._id)}>add to cart</button>
        </div>
      </div>
    </div>
    )
}
 