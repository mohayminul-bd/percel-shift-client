import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import { Link, useNavigate } from "react-router"; // ✅ ঠিক করা হলো
import GoogleLogin from "./GoogleLogin";
import axios from "axios";
import useAxios from "../../hooks/useAxios";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { createUser, updateUserProfile } = useAuth();
  const navigate = useNavigate(); // ✅ navigate যোগ করা হলো

  const [profilePic, setProfilePic] = useState("");
  const axiosInstance = useAxios();

  const onSubmit = (data) => {
    console.log(data);
    createUser(data.email, data.password)
      .then(async (result) => {
        console.log("✅ Registered user:", result.user);

        // update userinfo in the database
        const userInfo = {
          email: data.email,
          role: "user", // default role
          created_at: new Date().toISOString(),
          last_log_in: new Date().toISOString(),
        };

        const userRes = await axiosInstance.post("/users", userInfo);
        console.log(userRes.data);

        // update user profile in firebase
        const userProfile = {
          displayName: data.name,
          photoURL: profilePic,
        };
        updateUserProfile(userProfile)
          .then(() => {
            console.log("profile name pic update");
          })
          .catch((error) => {
            console.log(error);
          });
        navigate("/", { replace: true }); // ✅ register হলে সরাসরি home এ যাবে
      })
      .catch((error) => {
        console.error("❌ Register error:", error);
      });
  };

  const handleImageUpload = async (e) => {
    const image = e.target.files[0];
    console.log(image);
    const formData = new FormData();
    formData.append("image", image);
    const imageUploadUrl = `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_image_upload_key
    }`;

    const res = await axios.post(imageUploadUrl, formData);

    setProfilePic(res.data.data.url);
  };

  return (
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
      <div className="card-body">
        <h2 className="text-2xl">Create an Account</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset className="fieldset">
            {/* name field */}
            <label className="label">Name</label>
            <input
              type="name"
              {...register("name", { required: true })}
              className="input"
              placeholder="Name"
            />
            {errors.email?.type === "required" && (
              <p className="text-red-600">Name is required</p>
            )}

            {/* image file */}
            <label className="label">Image</label>
            <input
              type="file"
              onChange={handleImageUpload}
              className="input"
              placeholder="image"
            />

            {/* email field */}
            <label className="label">Email</label>
            <input
              type="email"
              {...register("email", { required: true })}
              className="input"
              placeholder="Email"
            />
            {errors.email?.type === "required" && (
              <p className="text-red-600">Email is required</p>
            )}

            {/* password  */}
            <label className="label">Password</label>
            <input
              type="password"
              {...register("password", { required: true, minLength: 6 })}
              className="input"
              placeholder="Password"
            />
            {errors.password?.type === "required" && (
              <p className="text-red-600">Password is required</p>
            )}
            {errors.password?.type === "minLength" && (
              <p className="text-red-600">
                Password must be at least 6 characters
              </p>
            )}

            <button className="btn btn-neutral mt-4 w-full">Register</button>
          </fieldset>
        </form>

        <p className="mt-4">
          Already have an account?{" "}
          <Link className="link link-primary" to="/login">
            Login
          </Link>
        </p>

        <GoogleLogin />
      </div>
    </div>
  );
};

export default Register;
