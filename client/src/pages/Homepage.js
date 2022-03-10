import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Button, } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import {Navbar} from 'react-bootstrap';

export default function Homepage() {
  const [query, setQuery] = useState("");
  const [therapistRole, setTherapistRole] = useState(false);
  const [typeOfTheray, setTypeOfTherapy] = useState();
  const [therapists, setTherapists] = useState([]);

  const handleSearch = (event) => {
    setQuery(event.target.value);
  };

  let results = therapists.filter((user) =>
    `${user.name} ${user.setTypeOfTherapy}`.toLowerCase().includes(query)
  );

  const storedToken = localStorage.getItem("authToken");

  // get all the therapists from the backend / server
  const getAllUsers = () => {
    // for every request to user route we need to also send the token
    axios
      .get("/users", { headers: { Authorization: `Bearer ${storedToken}` } })
      .then((response) => {
        console.log(response.data);
        // set the state of therapists
        setTherapists(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getAllUsers();
  }, []);

  console.log("therapists", therapists);

  if (!therapists) {
    return <></>;
  }
  return (
    <div>
      <h1>Find your Holistic Therapist!</h1>
      <div>
        <img
          className="w-100 h-70 backgroundImage"
          style={{ height: "90vh" }}
          src="https://images.unsplash.com/photo-1484553255294-313b931acd27?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2944&q=80"
          alt="Suculent"
        ></img>

        {/* <div className="content">
          <h1>Why holistic therapy?</h1>
          <p>'Holistic' originates from the Greek root 'holos', which translates as 'whole'. Therefore, 'holistic therapy' 
          is an umbrella term for any healthcare therapies and practices that treat the 
          entire body and the whole person, rather than curing ailments in isolation as modern medicine does.</p>
        </div> */}
      </div>
      <input type="search" value={query} onChange={handleSearch} placeholder="Search.."/>
           
      {results.map((therapist) => {
        return (
          <div>
            <Card
              className="rounded me-2"
              bg="light"
              border="danger"
              style={{
                width: "18rem",
                marginBottom: 15,
                marginLeft: 15,
                marginTop: 15,
                marginRight: 15,
              }}
            >
              <Card.Img
                variant="top"
                src={therapist.profilePicture}
                alt="userPhoto"
                className="card-img-top rounded mx-auto d-block"
                style={{ width: "200px" }}
              />
              <Card.Body>
                <Card.Title>Name: {therapist.name}</Card.Title>
                <Card.Title>Type of Therapy: {therapist.typeOfTherapy}</Card.Title>
                <Card.Link href={`/users/${therapist._id}`}>Details</Card.Link>
              </Card.Body>
            </Card>
          </div>
        );
      })}
    </div>
  );
}
