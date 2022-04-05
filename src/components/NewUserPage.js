import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./NewUserPage.css";

function NewUserPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Input field event listeners.
  const changeFirstName = (event) => {
    setFirstName(event.target.value);
  };
  const changeLastName = (event) => {
    setLastName(event.target.value);
  };

  // user creating function.
  const createUser = () => {
    if (firstName === "" || lastName === "") {
      setError("You cannot leave input fields blank!");
      setTimeout(function () {
        setError("");
      }, 3000);
    } else {
      fetch("https://assessment-users-backend.herokuapp.com/users", {
        method: "POST",
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          status: "active",
        }),
        headers: {
          "Content-type": "application/json",
        },
      }).then((response) => response.json());
      setSuccess(`You have successfully created a new user!
    `);
      setTimeout(function () {
        setSuccess("");
      }, 3000);
    }
  };

  return (
    <div className="creatorPageContainer">
      <h1 className="welcomeMessage">Let's create a new user!</h1>
      <div className="createContainer">
        <div className="inputContainer">
          <input
            onChange={changeFirstName}
            for="fname"
            type="text"
            placeholder="First name:"
          ></input>
        </div>
        <div className="inputContainer">
          <input
            onChange={changeLastName}
            for="lname"
            type="text"
            placeholder="Last name:"
          ></input>
        </div>

        <div className="editButtons">
          <button className="editButton">
            <Link className="toHomepage" to="/">
              Back
            </Link>
          </button>
          <button className="editButton" onClick={createUser}>
            Create
          </button>
        </div>
      </div>
      <h1 className="error">{error}</h1>
      <h1 className="success">{success}</h1>
    </div>
  );
}

export default NewUserPage;
