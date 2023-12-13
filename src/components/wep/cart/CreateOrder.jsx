import React, { useState } from 'react';
import axios from 'axios';

const CreateOrder = () => {
  const [couponName, setCouponName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token=localStorage.getItem("userToken")

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/order`,
        {
          couponName,
          address,
          phone,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log('Order created successfully', response.data);
    } catch (error) {
      console.error('Error creating order', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Coupon Name:
          <input
            type="text"
            value={couponName}
            onChange={(e) => setCouponName(e.target.value)}
          />
        </label>
        <br />
        <label>
          Address:
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </label>
        <br />
        <label>
          Phone:
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Create Order</button>
      </form>
    </div>
  );
};

export default CreateOrder;
