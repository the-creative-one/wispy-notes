import React from "react";
import { Link, useNavigate } from "react-router-dom";
// ", useLocation" for the location in the above import.
const Navbar = (props) => {

  // to use the active class in the nav-item 
  // let location = useLocation();

  // for log out
  let navigate = useNavigate();
  const handleLogout=()=>{
    localStorage.removeItem('token');
    props.showAlert("Logged Out Successfully." , "warning")
    navigate('/login');
    
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-primary-subtle mb-2 p-md-3">
        <div className="container-fluid">
          <Link className="navbar-brand text-info-emphasis" to="/">
            Wispy Notes
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {/* <li className="nav-item">
                <Link className={`nav-link ${location.pathname ==="/" ? "active" : " "}`}  aria-current="page" to="/">
                  Home
                </Link>
              </li> */}
              {/* <li className="nav-item">
                <Link className={`nav-link ${location.pathname ==="/about" ? "active" : " "}`} to="/about">
                  About
                </Link>
              </li> */}
            </ul>
            {!localStorage.getItem('token')? 
            <form className="d-flex">
             <Link className="btn btn-outline-success mx-2" to="/login" role="button">Log In</Link>
             <Link className="btn btn-outline-danger mx-2" role="button" to="/signup">Sign Up</Link>
             </form> : <button onClick={handleLogout} className="btn btn-primary ">Log Out</button> }
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
