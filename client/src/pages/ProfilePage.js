import React from "react";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import {Card, Button } from "react-bootstrap";
import { AuthContext } from "../context/auth";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import 'bootstrap/dist/css/bootstrap.min.css'

export default function UserProfilePage(props) {
  const { id } = useParams();
  const [userFromState, setUser] = useState(null);
  const [therapist, setTherapist] = useState(null);
  const [reviewText, setReviewText] = useState("");
  const [reviews, setReviews] = useState([]);
  const storedToken = localStorage.getItem("authToken");

  const { user } = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`/users/${id}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        console.log(response.data);
        if (response.data.role === "user") {
          setUser(response.data);
        }
        if (response.data.role === "therapist") {
          setTherapist(response.data);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSubmitReview = (e) => {
    // e.preventDefault()
    const requestBody = { reviewText, reviewTherapist: therapist._id };
    axios
      .post(`/api/crud/therapist/${id}`, requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        console.log("review from client side", response);
        // setReviews(response.data, ...reviews)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleReview = (e) => setReviewText(e.target.value);

  // get all the therapists from the backend / server
  const getReviews = () => {
    // for every request to user route we need to also send the token
    axios
      .get("/api/crud/reviews", {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        console.log("these are the reviews", response.data);
        // set the state of therapists
        setReviews(response.data);
        // navigate(`/users/${id}`)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getReviews();
  }, []);

  const deleteReview = (id) => {
    const storedToken = localStorage.getItem('authToken')
    axios
      .delete(`/api/crud/review/${id}`, { headers: { Authorization: `Bearer ${storedToken}` } })
      .then(() => {
       // redirect to the Profile Page
       getReviews();      })
      .catch((err) => console.log(err));
  };

  // if (reviews){console.log('this therapist', therapist._id)
  // console.log('this therapist from reviews', reviews[0].reviewTherapist)}

  if (therapist) {
    return (
      <>
        <div>
          <img
            className="w-100 h-70 backgroundImage"
            style={{
              height: "90vh",
            }}
            src="https://images.unsplash.com/photo-1484553255294-313b931acd27?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2944&q=80"
            alt="Suculent"
          ></img>
        </div>
        <div>
          <Card style={{ width: "18rem" }}>
            <Card.Img
              variant="top"
              src={therapist.profilePicture}
              alt="userPhoto"
              className="card-img-top rounded mx-auto d-block"
              className="mb-3"
              style={{ width: "200px" }}
            />
            <Card.Body>
              <Card.Title>{therapist.name}</Card.Title>
              <Card.Text>About me: {therapist.aboutMe}</Card.Text>
              <Card.Text>Address: {therapist.address}</Card.Text>
              <Card.Text>Phone Number:{therapist.phoneNumber}</Card.Text>
            </Card.Body>
          </Card>

          <p>Type of Therapy: {therapist.typeOfTherapy}</p>
          <p>Description of the Therapy: {therapist.description}</p>
        </div>
        {therapist._id !== user._id && (
          <form onSubmit={handleSubmitReview}>
            <label htmlFor="review">Review me: </label>
            <input type="text" value={reviewText} onChange={handleReview} />
            <button className="btn btn-sm btn-info" type="submit">Submit your review</button>
          </form>
        )}

        <h4>All the reviews for this therapist</h4>
        {reviews.map((review) => {
          if (therapist._id === review.reviewTherapist) {
            return (
              <div key={review._id}>
                {/* <h6>Review by:</h6> */}
                <p>{review.reviewText}</p>
                <button onClick={() => {
                    deleteReview(review._id);
                  }}
                  className="btn btn-sm btn-danger">Delete the review
                </button>
              </div>
            );
          }
        })}
        <Link to={`/users/edit/${therapist._id}`}>
          <button>Edit your profile</button>
        </Link>
      </>
    );
  }
  if (userFromState) {
    return (
      <>
        <div>
          <img
            className="w-100 h-70 backgroundImage"
            style={{
              height: "90vh",
            }}
            src="https://images.unsplash.com/photo-1484553255294-313b931acd27?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2944&q=80"
            alt="Suculent"
          ></img>
        </div>
        <div>
          <Card style={{ width: "18rem" }}>
            <Card.Img
              variant="top"
              src={userFromState.profilePicture}
              alt="userPhoto"
              className="card-img-top rounded mx-auto d-block"
              style={{ width: "200px" }}
            />
            <Card.Body>
              <Card.Title>{userFromState.name}</Card.Title>
            </Card.Body>
          </Card>
        </div>
        <Link to={`/users/edit/${userFromState._id}`}>
          <button>Edit your profile</button>
        </Link>
      </>
    );
  } else {
    return <div></div>;
  }
}
