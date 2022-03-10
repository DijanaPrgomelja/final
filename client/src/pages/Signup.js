import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import service from "../api/service";
import { AuthContext } from '../context/auth'



export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [typeOfTherapy, setTypeOfTherapy] = useState("");
  const [userRole, setUserRole] = useState(false);
  const [therapistRole, setTherapistRole] = useState(false);
  const [name, setName] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [aboutMe, setAboutMe] =useState("");

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

  const { storeToken, verifyStoredoken, user } = useContext(AuthContext)


  const handleSubmitUser = (e) => {
    e.preventDefault();
    const requestBody = {
      email,
      password,
      name,
      profilePicture,
      role: 'user',
    };
    axios
      .post("/api/auth/signup", requestBody)
      .then((response) => {
        // redirect to home
        navigate(`/login`)
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
      aboutMe,
      typeOfTherapy,
      description,
      role: 'therapist',
      name,
      profilePicture,
      address,
      phoneNumber,
    };
    axios
      .post("/api/auth/signup", requestBody)
      .then((response) => {
        navigate(`/login`)
      })
           
      .catch((err) => {
        const errorDescription = err.response.data.message;
        setErrorMessage(errorDescription);
      });
  };
  

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleTypeOfTherapy = (e) => setTypeOfTherapy(e.target.value);
  const handleAboutMe = (e) => setAboutMe(e.target.value);
  const handleUserRole = (e) => {
        setUserRole(e.target.checked);
  };
  const handleTherapistRole = (e) => setTherapistRole(e.target.checked);
  const handleName = (e) => setName(e.target.value);
  const handleDescription = (e) => setDescription(e.target.value);
  const handleAddress = (e) => setAddress(e.target.value);
  const handlePhoneNumber = (e) => setPhoneNumber(e.target.value);
  //const handleProfilePicture = (e) => setProfilePicture(e.target.value);

  console.log(typeOfTherapy)

  const [errorMessage, setErrorMessage] = useState(undefined);

  if (!userRole && !therapistRole) {
    return (
      <>
        <h2>Are you a user or a therapist?</h2>
        <label>User</label>
        <input
          type="checkbox"
          value="User"
          checked={userRole}
          onChange={handleUserRole}
        />
        <label>Therapist</label>
        <input
          type="checkbox"
          value="Therapist"
          checked={therapistRole}
          onChange={handleTherapistRole}
        />
      </>
    );
  } else if (userRole) {
    return (
      <>
          <h1>Signup as a User</h1>
          <form onSubmit={handleSubmitUser}>
          <div className="mb-3">
              <label htmlFor="name">Name: </label>
              <input type="text" value={name} onChange={handleName} />
            </div>
            <div className="mb-3">
              <label htmlFor="email">Email: </label>
              <input type="text" value={email} onChange={handleEmail} />
            </div>
            <div className="mb-3">
              <label htmlFor="password">Password: </label>
              <input type="password" value={password} onChange={handlePassword}/>
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="profilePicture">
                {" "}
                Profile picture:{" "}
              </label>
              <input
                className="form-control"
                type="file"
                name="profilePicture"
                onChange={handleFileUpload}
              />
              {profilePicture && (
                <img src={profilePicture} alt="" style={{ height: "200px" }} />
              )}
              <button type="submit">Sign Up</button>
            </div>
          </form>
          <h3>Already have an account?</h3>
       <Link to="/login">Login</Link>
        </>
    )
  } else if (therapistRole) {
    return(
      <>
          <h1>Signup as a Therapist</h1>
          <form onSubmit={handleSubmitTherapist}>
          <div className="mb-3">
              <label htmlFor="name">Name: </label>
              <input type="text" value={name} onChange={handleName} />
            </div>
            <div className="mb-3">
              <label htmlFor="email">Email: </label>
              <input type="text" value={email} onChange={handleEmail} />
            </div>

            <div className="mb-3">
              <label htmlFor="password">Password: </label>
              <input type="password" value={password} onChange={handlePassword}/>
            </div>
            <div className="mb-3">
              <label htmlFor="aboutMe">About me: </label>
              <input type="text" value={aboutMe} onChange={handleAboutMe} />
            </div>
            <div className="mb-3">
              <label htmlFor="address">Address: </label>
              <input type="address" value={address} onChange={handleAddress}/>
            </div>
            <div className="mb-3">
              <label htmlFor="phoneNumber">Phone number: </label>
              <input type="phoneNumber" value={phoneNumber} onChange={handlePhoneNumber}/>
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="profilePicture">
                Profile picture:{" "}
              </label>
              <input
                className="form-control"
                type="file"
                name="profilePicture"
                onChange={handleFileUpload}
              />
              {profilePicture && (
                <img src={profilePicture} alt="" style={{ height: "200px" }} />
              )}
            </div>
            
            <label htmlFor="typeOfTherapy">Type of therapy: </label>
            
            <select name="typeOfTherapy" id="typeOfTherapy" value={typeOfTherapy} onChange={handleTypeOfTherapy}>
              <option value="Osteopathy">Osteopathy</option>
              <option value="Acupuncture">Acupuncture</option>
              <option value="Chiropractic">Chiropractic</option>
              </select>
              
            <div>
              <label htmlFor="description">Description: </label>
            <input type="text" value={description} onChange={handleDescription}/>
            </div>
              
            <button type="submit">Sign Up</button>
            <div className="mb-3"></div>
            {errorMessage && <h5>{errorMessage}</h5>}
          </form>
          <h3>Already have an account?</h3>
       <Link to="/login">Login</Link>
        </>
    )
  }

}
