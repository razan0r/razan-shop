import React, { createContext } from 'react';
import axios from 'axios';

export const ProfileContext=createContext(null);
export const ProfileContextProvider = ({ children }) => {
  const getProfileContext=async ()=>{
    try{
        const token =localStorage.getItem('userToken');
        const {data}=await axios.get(`${import.meta.env.VITE_API_URL}/user/profile`,
        {headers: {Authorization:`Tariq__${token}`}})
        return data;
    }
    catch(error){console.log(error)}
}

  return <ProfileContext.Provider value={getProfileContext}>{children}</ProfileContext.Provider>;
};

