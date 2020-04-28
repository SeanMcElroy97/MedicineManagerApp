import React, { Component } from "react";
import "./Login.css";
import axios from "axios";
import AuthenticationService from "../../Authentication/AuthenticationService";
import { Formik, Field, Form, ErrorMessage } from "../../../node_modules/formik";

export default class LoginComponent extends Component {
  constructor(props) {
    super(props);

    console.log(props)
    this.state = {
      pharmEmail: "pharmacyX",
      pharmPassword: "",
    };

    this.loginValidation = this.loginValidation.bind(this);
  }


  render() {
    return (
      <div className=" container bg-primary text-white">
        <h1>Login</h1>
        <Formik
          initialValues={{
            pharmacyEmailInput: this.state.pharmEmail,
            pharmacyPasswordInput: this.state.pharmPassword
          }}
          onSubmit={this.loginValidation}>
          {({ values }) => (

            <Form>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <Field
                    className="form-control"
                    name="pharmacyEmailInput"
                    placeholder="Pharmacy Email"
                  />
                </div>
                <div className="form-group col-md-6">
                  <Field
                    className="form-control"
                    name="pharmacyPasswordInput"
                    placeholder="Password"
                  />
                </div>
              </div>
              <button type="submit" className="btn btn-success">Log in</button>
            </Form>
          )}

        </Formik>
      </div>
    );
  }

  // Hard coded
  loginValidation(values) {
    console.log(values);

    if (values.pharmacyEmailInput === "pharmacyX" && values.pharmacyPasswordInput === "password") {

      this.setState({ pharmEmail: values.pharmacyEmailInput, pharmPassword: values.pharmacyPasswordInput });

      console.log('The state is dis ' + this.state.pharmPassword)

      AuthenticationService.registerSuccessfulLogin(
        this.state.pharmEmail,
        this.state.pharmPassword
      );

      //console.log(this.props.history);
      // this.props.history.push(`/home/${this.state.pharmEmail}`);
      this.props.history.push('/home')

    }


    if (values.pharmacyEmailInput === "Admin" && values.pharmacyPasswordInput === "password") {

      this.setState({ pharmEmail: values.pharmacyEmailInput, pharmPassword: values.pharmacyPasswordInput });

      AuthenticationService.registerSuccessfulLogin(
        this.state.pharmEmail,
        this.state.pharmPassword
      );

      this.props.history.push('/home')

    }


  }
  //Call API to try Sign in an existing user
  signInExistingUsertoAPI() { }

}

