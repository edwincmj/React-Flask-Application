import React from "react";
import { useEffect } from "react";
import { useAuth } from "../contexts/authContext.js";
import { Navigate } from "react-router-dom";

const Test = () => {
  const auth = useAuth();

  useEffect(() => {
    console.log(auth.user);
  });

  const dosmth = (e) => {
    e.preventDefault();
    console.log(auth.user);
  };
  return (
    <>
      {/* {!auth.user ? (
        <Navigate replace to="/login" />
      ) : ( */}
        <>
          <div>Test</div>
          <button onClick={dosmth}>click here</button>
        </>
      {/* )} */}
    </>
  );
};

export default Test;
