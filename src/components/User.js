import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import "./User.css";

function User(props) {
  let userData = props.data;
  const [message, setMessage] = useState("");

  // changing the user status.
  const changeStatus = () => {
    if (props.data.status === "active") {
      fetch(
        `https://assessment-users-backend.herokuapp.com/users/${userData.id}`,
        {
          method: "put",
          body: JSON.stringify({
            created_at: userData.createdAt,
            first_name: userData.first_name,
            id: userData.id,
            last_name: userData.last_name,
            status: "locked",
          }),
          headers: {
            "Content-type": "application/json",
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
        });
    } else {
      fetch(
        `https://assessment-users-backend.herokuapp.com/users/${userData.id}`,
        {
          method: "put",
          body: JSON.stringify({
            created_at: userData.createdAt,
            first_name: userData.first_name,
            id: userData.id,
            last_name: userData.last_name,
            status: "active",
          }),
          headers: {
            "Content-type": "application/json",
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
        });
    }
    setMessage(
      "Successfully changed the user status. Refresh the page to see the result."
    );
  };

  return (
    <div className="userCard">
      <h1
        className={props.data.status === "active" ? "userActive" : "userLocked"}
      >
        {props.firstName}
      </h1>
      <h1
        className={props.data.status === "active" ? "userActive" : "userLocked"}
      >
        {props.lastName}
      </h1>
      <h1
        className={props.data.status === "active" ? "userActive" : "userLocked"}
      >
        {props.createdAt.slice(0, 10)}
      </h1>
      <div className="userActions">
        <button onClick={changeStatus}>Change Status</button>
        <button>
          <Link className="userLink" to={`/edit/${props.data.id}`}>
            Edit User
          </Link>
        </button>
      </div>
      <p className="editMessage">{message}</p>
    </div>
  );
}

export default User;
