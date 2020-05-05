import React, { Component } from "../../../node_modules/react";
import { Formik, Field, Form, ErrorMessage } from "../../../node_modules/formik";
import AuthenticationService from "../../Authentication/AuthenticationService"


export default class SignUpComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pharmacyEmail: '',
            pharmacyPassword: '',
            psiRegistrationNumber: '',
            pharmacyName: '',
            pharmacyContactNum: '',
            pharmacyAddress: ''
        }

        this.submitNewUserToAPI = this.submitNewUserToAPI.bind(this)
        this.loginPharmacy = this.loginPharmacy.bind(this)
    }

    render() {
        return (<div className="container">
            <h1>Sign Up</h1>

            <Formik
                initialValues={{
                    pharmacyEmail: this.state.pharmacyEmail,
                    pharmacyPassword: '',
                    psiRegistrationNumber: '',
                    pharmacyName: '',
                    contactNumber: '',
                    pharmacyAddress: ''
                }}
                onSubmit={(formData) => this.submitNewUserToAPI(formData)}
            >

                {() => (
                    <Form>
                        <div className="form-group">
                            <Field
                                className="form-control"
                                name="pharmacyEmail"
                                type="input"
                                placeholder="Email"
                            />
                        </div>
                        <div className="form-group ">
                            <Field
                                className="form-control"
                                name="pharmacyName"
                                placeholder="Pharmacy Name"
                            />
                        </div>
                        <div className="form-group">
                            <Field
                                className="form-control"
                                name="psiRegistrationNumber"
                                placeholder="PSI Registration Number"
                            />
                        </div>

                        <div className="form-group">
                            <Field
                                className="form-control"
                                name="pharmacyPassword"
                                placeholder="Password"
                                type="password"
                            />
                        </div>
                        <div className="form-group">
                            <Field
                                className="form-control"
                                name="contactNumber"
                                placeholder="Contact Number"

                            />
                        </div>
                        <div className="form-group">
                            <Field
                                className="form-control"
                                name="pharmacyAddress"
                                placeholder="Pharmacy Address"
                            />
                        </div>

                        <button type="submit" className="btn btn-success">Sign up</button>
                    </Form>
                )}
            </Formik>

        </div>);
    }


    //Call this when user details pass validation
    submitNewUserToAPI(formdata) {
        // console.log(formdata)

        // formdata.pharmacyEmail
        // formdata.pharmacyPassword

        AuthenticationService.newPharmacyPost(formdata)
            .then(response => {

                if (response.data == false) {
                    alert('pharmacy with existing details exists')
                } else {
                    this.loginPharmacy(formdata.pharmacyEmail, formdata.pharmacyPassword)
                }
            })

    }

    loginPharmacy(email, password) {
        AuthenticationService.pharmacyLogin(email, password)
            .then(response => {
                // console.log(response)
                AuthenticationService.registerSuccessfulLogin(response.data.jwt, email)
                this.props.history.push('/home')
            })
    }

}