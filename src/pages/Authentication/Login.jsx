import React from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import GoogleLogin from "./GoogleLogin";
import useAuth from "../../hooks/useAuth";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const { signIn } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const form = location.state?.from || "/";
  console.log(location);

  const onSubmit = (data) => {
    signIn(data.email, data.password)
      .then((result) => {
        console.log(result.user);
        navigate(form);
      })
      .catch((error) => console.log(error));
  };
  return (
    <div>
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <div className="card-body">
          <h2 className="text-2xl">Please LogIn</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <fieldset className="fieldset">
              <label className="label">Email</label>
              <input
                type="email"
                {...register("email")}
                className="input"
                placeholder="Email"
              />
              <label className="label">Password</label>
              <input
                type="password"
                {...register("password")}
                className="input"
                placeholder="Password"
              />
              <div>
                <a className="link link-hover">Forgot password?</a>
              </div>
              <button className="btn btn-neutral mt-4">Login</button>
            </fieldset>
          </form>
          <p>
            you are new user ? create account..
            <Link className="btn btn-link" to="/register">
              Register
            </Link>
          </p>
          <GoogleLogin></GoogleLogin>
        </div>
      </div>
    </div>
  );
};

export default Login;
