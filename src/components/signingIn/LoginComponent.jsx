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
      pharmEmail: "",
      pharmPassword: "",
    };

    this.loginValidation = this.loginValidation.bind(this);
  }


  render() {
    return (
      <div className=" container">
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
                    type="password"
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


    AuthenticationService.pharmacyLogin(values.pharmacyEmailInput, values.pharmacyPasswordInput)
      .then(response => {
        console.log(response)
        if (response.data.role == '[ROLE_PHARMACY]') {
          AuthenticationService.registerSuccessfulLogin(response.data.jwt, values.pharmacyEmailInput)
          this.props.history.push('/home')
        }
        if (response.data.role == '[ROLE_ADMIN]') {
          AuthenticationService.registerSuccessfulAdminLogin(response.data.jwt, values.pharmacyEmailInput)
          this.props.history.push('/adminmedicinefile')
        }

      })
      .catch(() => alert('incorrect login details'))

  }
  //Call API to try Sign in an existing user
  signInExistingUsertoAPI() { }

}

