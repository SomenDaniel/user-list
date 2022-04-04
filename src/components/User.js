import React from "react";
import { Link } from "react-router-dom";
import "./User.css";

function User(props) {
  let userData = props.data;

  // need a page refresh after status change.
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
  };
  console.log(userData.status);
  return (
    <div className="userCard">
      <h1>{props.firstName}</h1>
      <h1>{props.lastName}</h1>
      <h1>{props.createdAt}</h1>
      <div className="userActions">
        <button onClick={changeStatus}>Change Status</button>
        <button>
          <Link className="userLink" to={`/edit/${props.data.id}`}>
            Edit User
          </Link>
        </button>
      </div>
    </div>
  );
}

export default User;
