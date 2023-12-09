import React from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const SendCode = () => {
    const navigate =useNavigate();

  
    const initialValues= {
      email: '',
    }

    const onSubmit=async (values) => {
      try {
        const {data} = await axios.patch(`${import.meta.env.VITE_API_URL}/auth/sendcode`, {
          email: values.email,
        });

        console.log('Response:',data);
        if(data.message=='success'){
          toast.success('send code succecfully', {
              position: "top-right",
              autoClose: false,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              });
         navigate('/forgetpassword');
      }
    

      } catch (error) {
        console.error('Error sending code:', error.message);
      }
    }

  const formik = useFormik({
    initialValues,
    onSubmit,
  
});
  return (
    <form onSubmit={formik.handleSubmit}>
      <label>
        Email:
        <input
          type="email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
        />
      </label>
      <br />
      <button type="submit">Send Code</button>
    </form>
  );
};

export default SendCode;
