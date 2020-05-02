import React, { Component } from "../../../node_modules/react";
import { Formik, Field, Form, ErrorMessage } from "../../../node_modules/formik";
import AuthenticationService from "../../Authentication/AuthenticationService"


export default class SignUpComponent extends Component {
    constructor(props) {
        super(props);
        // this.state = {
        //     pharmacyEmail: '',
        //     pharmacyPassword: '',
        //     psiRegistrationNumber: '',
        //     pharmacyName: '',
        //     pharmacyContactNum: '',
        //     pharmacyAddress: ''
        // }

        this.submitNewUserToAPI = this.submitNewUserToAPI.bind(this)
    }

    render() {
        return (<div className="container">
            <h1>Sign Up</h1>

            <Formik
                initialValues={{
                    pharmacyEmail: '',
                    pharmacyPassword: '',
                    psiRegistrationNumber: '',
                    pharmacyName: '',
                    pharmacyContactNum: '',
                    pharmacyAddress: ''
                }}
                onSubmit={(formData) => this.submitNewUserToAPI(formData)}>

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
                                name="pharmacyContactNum"
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

        AuthenticationService.newPharmacyPost(formdata)
        this.props.history.push(`/home/${formdata.pharmacyEmail}`)
    }

}