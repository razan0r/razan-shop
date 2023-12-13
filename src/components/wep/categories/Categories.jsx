import axios from 'axios'
import React, {useContext, useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { useQuery } from 'react-query'
import './Categories.css'
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Link } from 'react-router-dom';
import {CartContext} from '../context/Cart.jsx';

export default function Categories() {

const getCategories=async()=>{
  const {data}=await axios.get(`${import.meta.env.VITE_API_URL}/categories/active?limit=10`);
  return data;

}

const x=useContext(CartContext)

const {data,isLoading}=useQuery('wep_categories',getCategories)
 if(isLoading){
  return <h2>loading....</h2>
 }

  return (
    <div className='container'>
      <div className="swiper-custom-pagination"></div>
      <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      spaceBetween={50}
      slidesPerView={6.3}
      navigation
      loop={true}
      autoplay={{
        delay:3000 
      }
      }
      Pagination={{
        clickable: true ,
        el:'.swiper-custom-pagination'
        }}
     // onSlideChange={() => }
     // onSwiper={(swiper) => }
      >
        {data?.categories.length?data?.categories.map((category)=>
        <SwiperSlide>
          <div className='category'>
          <Link to={`/products/category/${category._id}`}>
          <img src={category.image.secure_url} className='rounded-circle'/>
          <h2 className='fs-5'>{category.name}</h2>
          </Link>
          </div>
          </SwiperSlide>
      ):'no categories found'}
      </Swiper>
    </div>
  )
}
