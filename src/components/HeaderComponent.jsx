import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import AuthenticationService from "../Authentication/AuthenticationService";

class HeaderComponent extends Component {
  render() {
    const userLoggedIn = AuthenticationService.isUserLoggedIn();
    //console.log(userLoggedIn);

    return (
      <header>
        <nav className="navbar navbar-expand-md navbar-dark bg-success">
          <div className="navbar-brand">My Medicine Manager</div>
          <ul className="navbar-nav navbar-collapse justify-content-end">
            {userLoggedIn && (
              <Link to="/home">
                <li className="nav-link">Home</li>
              </Link>
            )}

            {userLoggedIn && (
              <Link to="/adminmedicinefile">
                <li
                  className="nav-link"
                // onClick={() => this.props.history.push("/adminmedicinefile")}
                >
                  Notifications
                </li>
              </Link>
            )}

            <Link to="/about">
              <li
                className="nav-link"
                onClick={() => console.log("About page a loading")}
              >
                About
              </li>
            </Link>

            {userLoggedIn && (
              <Link to="/" onClick={AuthenticationService.logoutUser}>
                <li className="nav-link">Logout</li>
              </Link>
            )}
          </ul>
        </nav>
      </header>
    );
  }
}

//WithRouter allows the navegation items to be updated whether logged in or out
export default withRouter(HeaderComponent);
