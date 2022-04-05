import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./EditPage.css";

function EditPage() {
  const { id } = useParams();
  const [user, setUser] = useState();
  const [loaded, setLoaded] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    getUser();
  }, []);

  const changeFirstName = (event) => {
    setFirstName(event.target.value);
  };
  const changeLastName = (event) => {
    setLastName(event.target.value);
  };

  const getUser = () => {
    fetch(`https://assessment-users-backend.herokuapp.com/users/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setUser(data);
        setLoaded(true);
      });
  };

  const editUser = () => {
    if (firstName === "" || lastName === "") {
      setError("You cannot leave input fields blank!");
      setTimeout(function () {
        setError("");
      }, 3000);
    } else {
      fetch(`https://assessment-users-backend.herokuapp.com/users/${id}`, {
        method: "put",
        body: JSON.stringify({
          created_at: user.created_at,
          first_name: firstName,
          id: id,
          last_name: lastName,
          status: user.status,
        }),
        headers: {
          "Content-type": "application/json",
        },
      }).then((response) => response.json());
      setSuccess(`You have successfully changed the user details.
    `);
      setTimeout(function () {
        setSuccess("");
      }, 3000);
    }
  };

  return (
    <div className="editPageContainer">
      <h1 className="editTitle">
        Edit user: {`${loaded === false ? "" : user.first_name}`}
      </h1>
      <div className="editContainer">
        {loaded === false ? (
          <h1 className="editLoading">Loading...</h1>
        ) : (
          <div>
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
              <button className="editButton" onClick={editUser}>
                Edit
              </button>
            </div>
          </div>
        )}
      </div>
      <h1 className="error">{error}</h1>
      <h1 className="success">{success}</h1>
    </div>
  );
}

export default EditPage;
