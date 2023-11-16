import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useForm } from "react-hook-form";
import { Link, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
  const { store, actions } = useContext(Context);
  const [statusUser, setStatusUser] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    fetch(process.env.BACKEND_URL + "/api/user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then(async (res) => {
        if (!res.ok) {
          alert("USER ALREADY IN DATABASE");
        }
        return res.json();
      })
      .then((data) => {
        const { message } = data;
        console.log("Success:", message); // Log the success message to the console
        navigate("/login");
      });
  };

  return status ? (
    <Navigate to="/login" />
  ) : (
<div className="container">
  <div className="row justify-content-center mt-5">
    <div className="col-md-6">
      <h2 className="text-center mb-4">Register</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group">   
          <label>
            Email
          </label>
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="Username"
                {...register("email", { required: "El correo es requerido" })}
              />
            {errors?.email && <p className="error-message">{errors.email.message}</p>}  
        </div>
        <div className="form-group">
          <label>
            Password
          </label>
              <input
                type="password"
                name="password"
                className="form-control"
                placeholder="Password"
                {...register("password", {
                  required: "Este campo es requerido",
                })}
              />
            {errors?.password && <p className="error-message">{errors.password.message}</p>}
        </div>
        <div className="mb-3 d-flex justify-content-evenly">
          <Link to="/login">
						<button className="btn btn-primary mt-2">I already have an account</button>
					</Link>
          <button type="submit" className="btn btn-primary mt-2">
            Sign Up
          </button>
        </div>
      </form>
    </div>
  </div>
</div> 
  );
};

export default Signup;