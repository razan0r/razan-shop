import axios from 'axios';
import React from 'react'
import {useParams} from 'react-router-dom'
import { useQuery } from 'react-query';
import {Link} from 'react-router-dom'

export default function CategoriesDetails() {
    const {categoryId}=useParams();

    const getCategoryDetails= async ()=>{
        const {data}=await axios.get(`${import.meta.env.VITE_API_URL}/products/category/${categoryId}`);
        return data.products;
    }

    const {data,isLoading}=useQuery('category_datails',getCategoryDetails);
    
    if(isLoading){
        return <p>Loading...</p>
    }


  return (
    <div className='products'>
        {data.length?data.map((product)=>
            <div className='product' key={product._id}>
                <img src={product.mainImage.secure_url}/>
                <h2>{product.name}</h2>
                <h2>{product._id}</h2>
                <Link to={`/products/${product._id}`}>details</Link>
            </div>
        ):<h2> there is no products available</h2>}
    </div>
    )
}
 