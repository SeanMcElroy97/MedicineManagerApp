import React, { Component } from "react";
import "./Login.css";
import axios from "axios";
import AuthenticationService from "../Authentication/AuthenticationService";

class LoginComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pharmEmail: "pharmacyX",
      pharmPassword: "",
      hasLoginFailed: false,
      hasLoginSucceded: false
    };

    this.inputChangeHandler = this.inputChangeHandler.bind(this);
    this.LoginValidation = this.LoginValidation.bind(this);
    //this.submitNewUserToAPI = this.submitNewUserToAPI.bind(this);
  }

  //Handles text user input on screen
  inputChangeHandler(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
    console.log(event.target.value);
  }

  render() {
    return (
      <div className="container">
        <h1>Login</h1>
        <div className="container">
          {this.state.hasSignUpFailed && (
            <div className="alert alert-warning">Invalid credentials</div>
          )}
          {this.state.hasLoginSucceded && (
            <div className="alert alert-success">Login Success</div>
          )}
          Pharmacy Email:
          <input
            type="text"
            name="pharmEmail"
            value={this.state.pharmEmail}
            onChange={this.inputChangeHandler}
          />
          Password:
          <input
            type="password"
            name="pharmPassword"
            value={this.state.password}
            onChange={this.inputChangeHandler}
          />
          <button className="btn btn-success" onClick={this.LoginValidation}>
            Login
          </button>
        </div>
      </div>
    );
  }

  //Sign Up Validation
  LoginValidation() {
    console.log("yo login hit");

    if (
      // this.state.pharmEmail !== null &&
      // this.state.pharmPassword.length >= 6

      this.state.pharmEmail === "pharmacyX" &&
      this.state.pharmPassword === "password"
    ) {
      this.setState({ hasLoginSucceded: true, hasSignUpFailed: false });
      AuthenticationService.registerSuccessfulLogin(
        this.state.pharmEmail,
        this.state.pharmPassword
      );
      this.props.history.push(`/home/${this.state.pharmEmail}`);
      //Send to api method
      //this.submitNewUserToAPI();
    } else {
      this.setState({
        hasSignUpFailed: true,
        hasLoginSucceded: false
      });
    }

    if (this.state.pharmEmail === "") {
      console.log("Email cannot be blank");
    }

    if (this.state.pharmPassword === "") {
      console.log("Password cannot be blank");
    }
  }

  //Call this when user details pass validation
  submitNewUserToAPI() {
    //1.EndPoint to hit. 2.Data to send. 3.Allow API to set cookie
    axios
      .post("http://localhost:8080/pharmacy/add", {
        pharmacyEmail: this.state.pharmEmail,
        pharmacyPassword: this.state.pharmPassword
      })
      .then(response => {
        console.log("registration res", response);
      })
      .catch(error => {
        console.log("registration error " + error);
      });

    axios.get("http://localhost:8080/test").then(response => {
      console.log("Response is " + response);
    });
  }

  //Call API to try Sign in an existing user
  signInExistingUsertoAPI() {}
}

export default LoginComponent;
