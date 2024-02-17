import React , {useState} from "react";
import {Link, useNavigate } from "react-router-dom";

const Signup = (props) => {
  const [creds, setCreds] = useState({name : "",email : "", password : "", cpassword : ""});
  let navigate = useNavigate();

  const handleSubmit =async (e) =>{
    e.preventDefault();
   const {name, email, password}= creds;
    const response = await fetch("http://localhost:5000/api/auth/createuser", {
      
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({name, email, password}),
    });
    const json =await response.json();
    console.log(json);
    if (json.success){
      // Save the auth token and redirect
      localStorage.setItem('token', json.authToken);
      
      props.showAlert("Account Created Successfully." , "secondary");navigate('/');
    }
    else {
      props.showAlert("Invalid Credentials" , "danger");
    }
  }

  const onChange = (e) => {
    setCreds({ ...creds, [e.target.name]: e.target.value });
  };



  return (
    <div className="container-fluid mt-4">
      <h3 className="text-center text-info-emphasis">Create an Account to Save your Notes h</h3>
    <form className="mt-4" onSubmit={handleSubmit} >
    <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Name
        </label>
        <input
          type="text"
          className="form-control"
          id="name"
          aria-describedby="emailHelp"
          value={creds.name}
          name="name"
          onChange={onChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email address
        </label>
        <input
          type="email"
          className="form-control"
          id="email"
          aria-describedby="emailHelp"
          value={creds.email}
          name="email"
          onChange={onChange}
        />
        <div id="emailHelp" className="form-text text-secondary">
          We'll never share your email with anyone else.
        </div>
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label ">
          Password
        </label>
        <input
          type="password"
          className="form-control"
          id="password"
          value={creds.password}
          name="password"
          onChange={onChange}
          minLength={5}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="cpassword" className="form-label ">
         Confirm Password
        </label>
        <input
          type="password"
          className="form-control"
          id="cpassword"
          value={creds.cpassword}
          name="cpassword"
          onChange={onChange}
          minLength={5}
          required
        />
      </div>
      <button type="submit" className="btn btn-danger" >
        Sign Up
      </button>
    </form>
    <p className="mt-2">Already have an account?  <b> <Link to="/login" className="text-success text-decoration-none">Log In .</Link></b></p>
  </div>
  )
}

export default Signup