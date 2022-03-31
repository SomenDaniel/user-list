import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import User from "./User";

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

  return (
    <>
      <h1>hello</h1>
      <button onClick={previouspage}>previouspage</button>
      <button onClick={nextpage}>nextpage</button>
      <button onClick={relo}>reload</button>
      <div>
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
              />
            ))
        )}
      </div>
      <p>paginated</p>
    </>
  );
}

export default MainPage;
