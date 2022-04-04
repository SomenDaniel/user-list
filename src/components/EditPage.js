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
  console.log(id);

  // missing validation and displaying errors but the main functionality is finished.
  useEffect(() => {
    getUser();
  }, []);

  const changeFirstName = (event) => {
    setFirstName(event.target.value);
    console.log(firstName);
  };
  const changeLastName = (event) => {
    setLastName(event.target.value);
    console.log(lastName);
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
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
  };

  console.log(user);

  return (
    <div className="editPageContainer">
      <h1 className="editTitle">
        Edit user: {`${loaded === false ? "" : user.first_name}`}
      </h1>
      <div className="editContainer">
        {loaded === false ? (
          <h1>loading</h1>
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
                <Link className="editToHomepage" to="/">
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
    </div>
  );
}

export default EditPage;
