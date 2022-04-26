import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";

const AddUser = () => {
  const handleUserFrom = (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;
    console.log(name, email);
    const user = { name, email };

    //send data to client side
    fetch("http://localhost:5000/user", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        alert("User Added Successfully");
        event.target.reset();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="w-50 mx-auto bg-dark text-light p-5 rounded-3">
      <h1 className="text-info">Add your details</h1>
      <form onSubmit={handleUserFrom}>
        <div className="mb-3">
          <label for="exampleInputPassword1" className="form-label">
            Enter Name
          </label>
          <input
            required
            name="name"
            type="text"
            className="form-control"
            id="exampleInputPassword1"
          />
        </div>

        <div className="mb-3">
          <label for="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            required
            name="email"
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>

        <div className="mb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="exampleCheck1"
          />
          <label className="form-check-label" for="exampleCheck1">
            Check me out
          </label>
        </div>
        <Button type="submit" className="btn btn-primary">
          Add User
        </Button>
      </form>
    </div>
  );
};

export default AddUser;
