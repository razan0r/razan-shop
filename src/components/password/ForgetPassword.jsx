
import React from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const ForgetPassword = () => {
    const navigate =useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      code: '',
    },
    onSubmit: async (values) => {
      try {
        const response = await axios.patch(`${import.meta.env.VITE_API_URL}/auth/forgotPassword`, values);

        console.log('Response:', response.data);
        if(response.message=='success'){
            localStorage.setItem('userToken',data.token);
            saveCurrentUser();
            toast.success('password updated succecfully', {
                position: "top-right",
                autoClose: false,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
            navigate('/login');
        }
      } catch (error) {
        console.error('Error updating password:', error.message);
      }
    },
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
      <label>
        New Password:
        <input
          type="password"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
        />
      </label>
      <br />
      <label>
        Code:
        <input
          type="text"
          name="code"
          value={formik.values.code}
          onChange={formik.handleChange}
        />
      </label>
      <br />
      <button type="submit">Update Password</button>
    </form>
  );
};

export default ForgetPassword;

