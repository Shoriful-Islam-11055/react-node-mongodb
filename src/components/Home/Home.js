import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/user")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  const handleUserDelete = (id) => {
    const proceed = window.confirm("Are you want to delete!");
    if (proceed) {
      console.log("deleting id", id);
      const url = `http://localhost:5000/user/${id}`;
      fetch(url, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.deletedCount > 0) {
            console.log("delete successfully");
            const remaining = users.filter((user) => user._id !== id);
            setUsers(remaining);
          }
        });
    }
  };

  return (
    <div className="text-center w-75 mx-auto">
      <h2 className="text-center">The total users: {users.length}</h2>
      <div className="row size">
        {users.map((user) => (
          <p key={user._id} className="bg-info col-md-4 me-3 px-3">
            User Name:: {user.name} <br />
            User Email:: {user.email} <br />
            <br />
            <div>
              <Button onClick={() => handleUserDelete(user._id)}>Delete</Button>

              <Link to={`/update/${user._id}`}><Button className="ms-2">Update</Button></Link>
            </div>
          </p>
        ))}
      </div>
    </div>
  );
};

export default Home;
