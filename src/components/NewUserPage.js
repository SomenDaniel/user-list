import React from "react";
import { useState } from "react";

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
    <>
      <h1>hello</h1>
      <div>
        <label for="fname">First name:</label>
        <input onChange={changeFirstName} for="fname" type="text"></input>
        <label for="lname">Last name:</label>
        <input onChange={changeLastName} for="lname" type="text"></input>
        <button onClick={createUser}>Create</button>
      </div>
    </>
  );
}

export default NewUserPage;
