import React from 'react'
import Navbar from '../components/dashbord/navbar/Navbar'
import Footer from '../components/dashbord/footer/Footer'
import {Outlet} from 'react-router-dom'

export default function DashboardLayout() {
  return (
    <>
    <Navbar />
    <Outlet />
   <Footer />
   </>
    )
}
