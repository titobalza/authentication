import React, { useEffect, useState, useContext } from 'react';
import { Context } from "../store/appContext";
import { Link, Navigate } from "react-router-dom";

const Private = () => {
  const {store, actions} = useContext(Context);
  const mensaje=store.message
  useEffect(() =>{
    if(store.token)actions.getPrivateMessage()
  },[store.token])

  

  return (
    <div>
      {mensaje !== "Hello! I'm private" ? (
       <div> 
        <h2 className="text-center mb-4 mt-5">Sorry, go to log in</h2>
        <Link to="/login">
        <button className="btn btn-primary mt-2 mx-auto d-block ">Login</button>
        </Link>
      </div>
      ) : (
        <h2 className="text-center mb-4"> {mensaje}</h2>
      )}
    </div>
  );
};

export default Private;