import React, { useContext } from 'react'
import Input from '../../pages/Input'
import { Formik, useFormik } from 'formik'
import { loginSchema } from '../validation/Validate.js'
import axios from 'axios'
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../context/User.jsx'

export default function Login() {
   let {userToken,setUserToken}=useContext(UserContext)
   const navigate =useNavigate();

    if(userToken){
        navigate(-1)
    }

    const initialValues= {
        email:'',
        password:'',
    }

    const onSubmit=async users=>{

    const {data}=await axios.post(`https://ecommerce-node4.vercel.app/auth/signin`,users);
        if(data.message=='success'){
            localStorage.setItem('userToken',data.token);
            setUserToken(data.token);
            toast.success('login succecfully', {
                position: "top-right",
                autoClose: false,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
            navigate('/');
        }

}

    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema:loginSchema,
      
    });

    const inputs=[
         {
            id:'email',
            type:'email',
            name:'email',
            title:'User email',
            value:formik.values.email,

        },
        {
            id:'password',
            type:'password',
            name:'password',
            title:'User password',
            value:formik.values.password,

        },
    ];

    const renderInputs=inputs.map((input,index) =>
        <Input type={input.type} 
        id={input.id} 
        name={input.name} 
        title={input.title} 
        value={input.value}
        key={index} 
        onChange={formik.handleChange}
        errors={formik.errors} 
        onBlur={formik.handleBlur}
        touched={formik.touched}
          />
)

  return (
    <>
    <div className="container">
            <h2>Login</h2>
            <form onSubmit={formik.handleSubmit} >
            {renderInputs}
<Link className="w-100 " to="/sendcode">forgit password?</Link>
            <button className="w-100" type='submit' disabled={!formik.isValid}>Login</button>
            
            </form>
    </div>
    </>
  )
}

