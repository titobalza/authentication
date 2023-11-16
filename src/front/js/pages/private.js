import React, { useEffect, useState, useContext } from 'react';
import { Context } from "../store/appContext";
const Private = () => {
  const {store, actions} = useContext(Context);
  const mensaje=store.message
  useEffect(() =>{
    if(store.token)actions.getPrivateMessage()
  },[store.token])

  

  return (
    <div>
      {mensaje !== "Hello! I'm private" ? (
        <p>Sorry, go to log in</p>
      ) : (
        <p>{mensaje}</p>
      )}
    </div>
  );
};

export default Private;