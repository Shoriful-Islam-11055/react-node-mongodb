import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

const UpdateUser = () => {
    const {id} = useParams();
    const [user, setUser] = useState({});
    useEffect(()=> {
        const url = `http://localhost:5000/user/${id}`
        fetch(url)
        .then(res => res.json())
        .then(data => setUser(data));
    },[])

    const handleUpdateUser = (event) => {
        event.preventDefault();
        const name = event.target.name.value;
        const email = event.target.email.value;
        console.log(name, email);
        const Updated_user = { name, email };
    
        //send data to client  update
        const url = `http://localhost:5000/user/${id}`
        fetch(url, {
          method: "PUT", // or 'PUT'
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(Updated_user),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log("Success:", data);
            alert("User Added Successfully");
            event.target.reset();
          })
          
      };

    return (
        <div className='w-50 mx-auto bg-dark text-light p-5 rounded-3'>
            <h2>Updating user : {user.name}</h2>
            <form onSubmit={handleUpdateUser}>
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
          Update User
        </Button>
      </form>
        </div>
    );
};

export default UpdateUser;