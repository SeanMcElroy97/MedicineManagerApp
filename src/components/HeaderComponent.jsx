import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import AuthenticationService from "../Authentication/AuthenticationService";

class HeaderComponent extends Component {
  render() {
    const userLoggedIn = AuthenticationService.isUserLoggedIn();
    const adminLoggedIn = AuthenticationService.isAdminLoggedIn();
    //console.log(userLoggedIn);

    return (
      <header className="header-component">
        <nav className="navbar navbar-expand-md navbar-dark bg-success">
          <div className="navbar-brand" onClick={() => {
            if (userLoggedIn) { this.props.history.push('/home') }
            if (adminLoggedIn) { this.props.history.push('/adminmedicinefile') }
            if (!adminLoggedIn && !userLoggedIn) { this.props.history.push('/signout') }
          }}>My Medicine Manager</div>
          <ul className="navbar-nav navbar-collapse justify-content-end .navbar-fixed-top">
            {userLoggedIn && (
              <Link to="/home">
                <li className="nav-link">Home</li>
              </Link>
            )}

            {/* {adminLoggedIn && (
              <Link to="/adminmedicinefile">
                <li
                  className="nav-link"
                // onClick={() => this.props.history.push("/adminmedicinefile")}
                >
                  Admin
                </li>
              </Link>
            )} */}

            <Link to="/about">
              <li
                className="nav-link"
                onClick={() => this.props.history.push("/about")}
              >
                About
              </li>
            </Link>

            {(userLoggedIn || adminLoggedIn) && (
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
