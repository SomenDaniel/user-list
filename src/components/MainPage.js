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
    } else {
      currentPage++;
      localStorage.setItem("page", `${currentPage}`);
      window.location.reload(false);
    }
  }

  function previouspage() {
    currentPage = Number(localStorage.getItem("page"));
    if (currentPage === 1) {
    } else {
      currentPage--;
      localStorage.setItem("page", `${currentPage}`);
      window.location.reload(false);
    }
  }

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
      <div className="paginationContainer">
        <button onClick={previouspage}>previouspage</button>
        <p>{currentPage}</p>
        <button onClick={nextpage}>nextpage</button>
      </div>
      <div className="users">
        {loaded === false ? (
          <h1 className="loading">Loading...</h1>
        ) : (
          users
            .slice((currentPage - 1) * 10, currentPage * 10)
            .map((user) => (
              <User
                key={user.id}
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
