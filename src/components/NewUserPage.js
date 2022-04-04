import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./NewUserPage.css";

function NewUserPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const changeFirstName = (event) => {
    setFirstName(event.target.value);
    console.log(firstName);
  };
  const changeLastName = (event) => {
    setLastName(event.target.value);
    console.log(lastName);
  };

  const createUser = () => {
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
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
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
    </div>
  );
}

export default NewUserPage;
