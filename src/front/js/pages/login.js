import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from "../store/appContext";

const LoginForm = () => {
  const {store, actions} = useContext(Context);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const token = (sessionStorage.getItem('token'));
  const navigate = useNavigate();
  const handleClick = () => {
  actions.login(email, password)
  };
  if (token && token != ''&& token != undefined ) navigate("/")
  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform login logic here
    console.log('Login form submitted!');
    console.log('Email:', email);
    console.log('Password:', password);
  
  };

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-md-6">
          <h2 className="text-center mb-4">Login</h2>
          {(token && token !== '' && token !== undefined) ? (
            <>
            <p>You are Logged in with the token: {token}</p>
            </>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button type="button" className="btn btn-primary" onClick={handleClick}>
                Login
              </button>
            </form>
          )}
         
        </div>
      </div>
    </div>
  );
};

export default LoginForm;