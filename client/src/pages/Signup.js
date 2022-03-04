import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import service from "../api/service";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [typeOfTherapy, setTypeOfTherapy] = useState("");
  const [role, setRole] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [profilePicture, setProfilePicture] = useState("");

  const handleFileUpload = (e) => {
    // const uploadData = new FormData()
    console.log("The file to be uploaded is: ", e.target.files[0]);

    const uploadData = new FormData();

    uploadData.append("imageURL", e.target.files[0]);

    service
      .handleUpload(uploadData)
      .then((response) => {
        setProfilePicture(response.secure_url);
      })
      .catch((err) => console.log("Error when uploading the file: ", err));
  };

  const navigate = useNavigate();

  const handleSubmitUser = (e) => {
    e.preventDefault();
    const requestBody = {
      email,
      password,
      role,
      profilePicture,
    };
    axios
      .post("/api/auth/signup", requestBody)
      .then((response) => {
        // redirect to home
        navigate("/");
      })
      .catch((err) => {
        const errorDescription = err.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  const handleSubmitTherapist = (e) => {
    e.preventDefault();
    const requestBody = {
      email,
      password,
      typeOfTherapy,
      role,
      firstName,
      lastName,
      profilePicture,
    };
    axios
      .post("/api/auth/signup", requestBody)
      .then((response) => {
        // redirect to home
        navigate("/");
      })
      .catch((err) => {
        const errorDescription = err.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleTypeOfTherapy = (e) => setTypeOfTherapy(e.target.value);
  const handleRole = (e) => setRole(e.target.value);
  const handleFirstName = (e) => setFirstName(e.target.value);
  const handleLastName = (e) => setLastName(e.target.value);
  //const handleProfilePicture = (e) => setProfilePicture(e.target.value);

  const [errorMessage, setErrorMessage] = useState(undefined);

  return (

	<>
	<h1>Signup as a User</h1>
	<form onSubmit={handleSubmitUser}>
        <div className="mb-3">
          <label htmlFor="email">Email: </label>
          <input type="text" value={email} onChange={handleEmail} />
        </div>
		<div className="mb-3">
          <label htmlFor="password">Password: </label>
          <input type="password" value={password} onChange={handlePassword} />
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="profilePicture"> Profile picture:{" "}</label>
          <input className="form-control" type="file" name="profilePicture"onChange={handleFileUpload}/>
           {profilePicture && ( <img src={profilePicture} alt="" style={{ height: "200px" }} /> )}
		   <button type="submit">Sign Up</button>
        </div>
		</form>

	
     <h1>Signup as a Therapist</h1>
      <form onSubmit={handleSubmitTherapist}>
        <div className="mb-3">
          <label htmlFor="email">Email: </label>
          <input type="text" value={email} onChange={handleEmail} />
        </div>

        <div className="mb-3">
          <label htmlFor="password">Password: </label>
          <input type="password" value={password} onChange={handlePassword} />
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="profilePicture">Profile picture:{" "}</label>
          <input className="form-control" type="file" name="profilePicture" onChange={handleFileUpload}/>
           {profilePicture && (
          <img src={profilePicture} alt="" style={{ height: "200px" }} />)}
        </div>
		
        <label htmlFor="typeOfTherapy">Type of therapy: </label>
        <input type="text" value={typeOfTherapy} onChange={handleTypeOfTherapy}/>
        <label htmlFor="role">Role: </label>
        <input type="text" value={role} onChange={handleRole} />
        <label htmlFor="firstName">First Name: </label>
        <input type="text" value={firstName} onChange={handleFirstName} />
        <label htmlFor="lastName">Last Name: </label>
        <input type="text" value={lastName} onChange={handleLastName} />
        <button type="submit">Sign Up</button>
        <div className="mb-3">
        </div>
        {errorMessage && <h5>{errorMessage}</h5>}
      </form>

      <h3>Already have an account?</h3>
      <Link to="/login">Login</Link>
    </>
  );
}
