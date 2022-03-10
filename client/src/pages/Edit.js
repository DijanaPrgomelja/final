import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function EditUser() {
  //name, aboutMe, address, phoneNumber, typeOfTherapy, discription
  const [name, setName] = useState("");
  const [aboutMe, setAboutMe] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [typeOfTherapy, setTypeOfTherapy] = useState("");
  const [description, setDescription] = useState("");

  const { id } = useParams();

  const navigate = useNavigate();
  const storedToken = localStorage.getItem("authToken");

  const handleSubmit = (e) => {
      console.log(id)
    e.preventDefault();
    const requestBody = {
      name,
      aboutMe,
      address,
      phoneNumber,
      typeOfTherapy,
      description,
    };
    axios
      .put(`/api/crud/user/${id}`, requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then(() => {
        // this redirects using react router
        navigate(`/users/${id}`);
      })
      .catch((err) => console.log(err));
  };

  const deleteUser = () => {
    axios
      .delete(`/api/crud/user/${id}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then(() => {
        // redirect to the Home Page
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    axios
      .get(`/users/${id}`)
      .then((response) => {
        const {
          name,
          aboutMe,
          address,
          phoneNumber,
          typeOfTherapy,
          description,
        } = response.data;
        setName(name);
        setAboutMe(aboutMe);
        setAddress(address);
        setPhoneNumber(phoneNumber);
        setTypeOfTherapy(typeOfTherapy);
        setDescription(description);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <h1>Edit this User</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name: </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="aboutMe">About me: </label>
        <input
          id="aboutMe"
          type="text"
          value={aboutMe}
          onChange={(e) => setAboutMe(e.target.value)}
        />
        <label htmlFor="address"> Address: </label>
        <input
          id="address"
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <label htmlFor="phoneNumber">APhone Number: </label>
        <input
          id="phoneNumber"
          type="text"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <select
          name="typeOfTherapy"
          id="typeOfTherapy"
          value={typeOfTherapy}
          onChange={(e) => setTypeOfTherapy(e.target.value)}
        >
          <option value="Osteopathy">Osteopathy</option>
          <option value="Acupuncture">Acupuncture</option>
          <option value="Chiropractic">Chiropractic</option>
        </select>

        <label htmlFor="title">Description: </label>
        <input
          id="description"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit">Update this User</button>
      </form>

      <button onClick={deleteUser}>Or delete this User</button>
    </>
  );
}
