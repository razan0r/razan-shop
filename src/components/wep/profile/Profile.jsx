import React, { useContext } from 'react';
import {ProfileContext} from "../context/Profile"
import { useQuery } from 'react-query';
const Profile = () => {
  const getProfileContext=useContext(ProfileContext)

  const getProfile=async()=>{
    const res=await getProfileContext();
    return res;
}

const {data,isLoading}= useQuery("profile",getProfile)
console.log(data);

  return (
    <div>
      {data ? (
        <div>
          <h1>User Profile</h1>
          <p className=" fw-bold">Name: {data.user.userName}</p>
          <p className=" fw-bold">Email: {data.user.email}</p>
          {/* Add more profile information as needed */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Profile;
