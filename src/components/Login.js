import React , {useState} from "react";
import {Link, useNavigate } from "react-router-dom";

const Login = (props) => {
  const [creds, setCreds] = useState({email : "", password : ""});
  let navigate = useNavigate();

  const handleSubmit =async (e) =>{
    e.preventDefault();
  
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({email: creds.email, password : creds.password}),
    });

    const json =await response.json();
    console.log(json);
    if (json.success){
      // Save the auth token and redirect
      localStorage.setItem('token', json.authToken);
      props.showAlert("You've Been Logged in Successfully." , "dark");
      navigate('/');
      
    }
    else {
      props.showAlert("Invalid Details." , "danger")
    }
  }

  const onChange = (e) => {
    setCreds({ ...creds, [e.target.name]: e.target.value });
  };

  return (
    <div className="container-fluid mt-4">
      <h3 className="text-center text-info-emphasis">Log In to Access Wispy Notes</h3>
          <form className="mt-4" onSubmit={handleSubmit}>
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
              />
            </div>
            <button type="submit" className="btn btn-success" >
              Log In
            </button>
          </form>
          <p className="mt-2">Don't have an account? Create an account - <b><Link to="/signup" className="text-danger text-decoration-none">Sign up .</Link></b></p>
        </div>
  );
};

export default Login;
