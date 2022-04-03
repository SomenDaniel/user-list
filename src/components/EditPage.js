import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

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
    <>
      <h1>edit</h1>
      <button onClick={setUser}>check</button>
      <div>
        {loaded === false ? (
          <h1>loading</h1>
        ) : (
          <div>
            <label for="fname">First name:</label>
            <input
              onChange={changeFirstName}
              for="fname"
              type="text"
              placeholder={`${user.first_name}`}
            ></input>
            <label for="lname">Last name:</label>
            <input
              onChange={changeLastName}
              for="lname"
              type="text"
              placeholder={`${user.last_name}`}
            ></input>
            <button onClick={editUser}>Edit</button>
          </div>
        )}
      </div>
    </>
  );
}

export default EditPage;
