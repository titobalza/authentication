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
          const { message } = await res.json();
          console.log("Error:", message); // Log the error message to the console
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
      <form onSubmit={handleSubmit(onSubmit)} className="signup-form">
        <div className="mb-3 row">
          <h2>Register</h2>
          <label htmlFor="staticEmail" className="col-sm-2 col-form-label">
            Email:
          </label>
          <div className="col-sm-10">
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1"></span>
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="Username"
                {...register("email", { required: "El correo es requerido" })}
              />
            </div>
            {errors?.email && <p className="error-message">{errors.email.message}</p>}
          </div>
        </div>
        <div className="mb-3 row">
          <label htmlFor="inputPassword" className="col-sm-2 col-form-label">
            Password:
          </label>
          <div className="col-sm-10">
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1"></span>
              <input
                type="password"
                name="password"
                className="form-control"
                placeholder="Password"
                {...register("password", {
                  required: "Este campo es requerido",
                })}
              />
            </div>
            {errors?.password && <p className="error-message">{errors.password.message}</p>}
          </div>
        </div>
        <div className="mb-3 d-flex justify-content-evenly">
          <button type="submit" className="btn btn-primary">
            Let's do it
          </button>
          <Link to="/login">
						<button className="btn btn-primary">I already have an account</button>
					</Link>
        </div>
      </form>
    </div>
  );
};

export default Signup;