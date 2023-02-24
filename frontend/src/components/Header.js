import React from "react";
import { Link } from "react-router-dom";
// import AuthService from "../services/auth.service";

// import { useAuth } from "../contexts/authContext";
import Logo from "../assets/Logo.png";

const Header = () => {
  
  // const auth = useAuth(); 

  const logOut = () => {
    // auth.logout(); 
  };

  return (
    <nav className="navbar navbar-expand navbar-light bg-light px-3">
        {/* <Link to={"/"} className="navbar-brand">
          DBS
        </Link> */}
        <a href="/"><img width="96px" alt="profile-img" src={Logo}/></a>
        <div className="navbar-nav me-auto">
          <li className="nav-item">
            <Link to={"/"} className="nav-link">
              Home
            </Link>
          </li>

          {/* {showModeratorBoard && (
            <li className="nav-item">
              <Link to={"/mod"} className="nav-link">
                Moderator Board
              </Link>
            </li>
          )}

          {showAdminBoard && (
            <li className="nav-item">
              <Link to={"/admin"} className="nav-link">
                Admin Board
              </Link>
            </li>
          )} */}

          {/* {auth.user && ( */}
            <li className="nav-item">
              <Link to={"/user"} className="nav-link">
                User
              </Link>
            </li>
          {/* )} */}
        </div>

        {/* {auth.user ? ( */}
          <div className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link to={"/profile"} className="nav-link">
                {/* {auth.user.info.username} */}
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/login"} className="nav-link" onClick={logOut}>
              Logout
              </Link>
            </li>
          </div>
        {/* ) : ( */}
          <div className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link to={"/login"} className="nav-link">
                Login
              </Link>
            </li>

            {/* <li className="nav-item">
              <Link to={"/register"} className="nav-link">
                Sign Up
              </Link>
            </li> */}
          </div>
        {/* )} */}
      </nav>
  )
}

export default Header