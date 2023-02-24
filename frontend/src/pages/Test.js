import React from "react";
import { useEffect, useState } from "react";
import { useAuth } from "../contexts/authContext.js";
import { Navigate, useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode"; 

const Test = () => {
  const auth = useAuth();
  const [authItem,setAuthItem] = useState(localStorage.getItem("user"))
  const [userInfo,setUserInfo] = useState(authItem==null?'':jwt_decode(authItem))

  useEffect(() => {
  },[]);

  const dosmth = (e) => {
    e.preventDefault();
    console.log("JWT token:",authItem);
    console.log("Decoded JWT token:", userInfo)
  };

  return (
    <>
      {authItem==null ? (
        <Navigate replace to="/login" />
      ) : (
        <>
          <div>Test</div>
          <button onClick={dosmth}>click here</button>
        </>
      )}
    </>
  );
};

export default Test;
