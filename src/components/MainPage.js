import React from "react";
import { useState, useEffect } from "react";
import User from "./User";
import { Link } from "react-router-dom";
import "./MainPage.css";

function MainPage() {
  const [users, setUsers] = useState([]);
  const [loaded, setLoaded] = useState(false);

  let currentPage = Number(localStorage.getItem("page")) || 1;

  if (currentPage === 1) {
    localStorage.setItem("page", `1`);
  }

  // ezzel sikerült.....
  // sikerül megváltoztatni a státuszt, és az adatokat is sikerült módosítani. de errort kapok vissza.
  const testUpdate = () => {
    fetch("https://assessment-users-backend.herokuapp.com/users/250", {
      method: "put",
      body: JSON.stringify({
        created_at: "2022-03-06T12:49:46.085Z",
        first_name: "mr",
        id: 250,
        last_name: "wenger",
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

  const testcreate = () => {
    fetch("https://assessment-users-backend.herokuapp.com/users", {
      method: "POST",
      body: JSON.stringify({
        first_name: "szia",
        last_name: "uram",
        status: "locked",
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

  const loadUsers = () => {
    fetch("https://assessment-users-backend.herokuapp.com/users", {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
        setLoaded(true);
      });
  };

  useEffect(() => {
    loadUsers();
  }, []);

  function nextpage() {
    currentPage = Number(localStorage.getItem("page"));
    if (Math.trunc(users.length / 10) + 1 === currentPage) {
      console.log("itt a vége"); //replace with some error message to the user
    } else {
      currentPage++;
      localStorage.setItem("page", `${currentPage}`);
      window.location.reload(false);
    }
  }

  function previouspage() {
    currentPage = Number(localStorage.getItem("page"));
    if (currentPage === 1) {
      console.log("első oldal ne tovább"); //replace with some error message to the user
    } else {
      currentPage--;
      localStorage.setItem("page", `${currentPage}`);
      window.location.reload(false);
    }
  }
  function relo() {
    localStorage.removeItem("page");
  }
  console.log(users);
  return (
    <div className="homeContainer">
      <div className="header">
        <h1>User List</h1>
        <button>
          <Link className="toNew" to="/new">
            New
          </Link>
        </button>
      </div>

      {/* <button onClick={testUpdate}>test</button>

      <button onClick={relo}>reload</button> */}
      <div className="paginationContainer">
        <button onClick={previouspage}>previouspage</button>
        <p>{currentPage}</p>
        <button onClick={nextpage}>nextpage</button>
      </div>
      <div className="users">
        {loaded === false ? (
          <h1>cs</h1>
        ) : (
          users
            .slice((currentPage - 1) * 10, currentPage * 10)
            .map((user) => (
              <User
                firstName={user.first_name}
                lastName={user.last_name}
                createdAt={user.created_at}
                data={user}
              />
            ))
        )}
      </div>
      <div className="paginationContainer">
        <button onClick={previouspage}>previouspage</button>
        <p>{currentPage}</p>
        <button onClick={nextpage}>nextpage</button>
      </div>
    </div>
  );
}

export default MainPage;
