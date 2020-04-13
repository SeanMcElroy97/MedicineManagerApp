import React, { Component } from "../../../node_modules/react";
import { Formik, Field, Form, ErrorMessage } from "../../../node_modules/formik";


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
    }

    render() {
        return (<div className="container bg-dark text-white">
            <h1>Sign Up</h1>

            <Formik
                initialValues={{
                    pharmacyEmailInput: this.state.pharmacyEmail,
                    pharmacyPasswordInput: this.state.pharmacyPassword,
                    psiRegistrationNumberInput: this.state.psiRegistrationNumber,
                    pharmacyNameInput: this.state.pharmacyName,
                    pharmacyContactNumInput: this.state.pharmacyContactNum,
                    pharmacyAddressInput: this.state.pharmacyAddress
                }}
                onSubmit={() => console.log('sign up button hit')}>

                {({ values }) => (
                    <Form>
                        <div className="form-row">

                            <div className="form-group col-md-6">
                                <Field
                                    className="form-control"
                                    name="pharmacyNameInput"
                                    placeholder="Pharmacy Name"
                                />
                            </div>
                            <div className="form-group col-md-6">
                                <Field
                                    className="form-control"
                                    name="psiRegistrationNumberInput"
                                    placeholder="PSI Registration Number"
                                />
                            </div>



                        </div>

                        <div className="form-group">
                            <Field
                                className="form-control"
                                name="pharmacyEmailInput"
                                placeholder="Email"
                            />
                        </div>

                        <div className="form-group">
                            <Field
                                className="form-control"
                                name="pharmacyPasswordInput"
                                placeholder="New password"
                            />
                        </div>
                        <div className="form-group">
                            <Field
                                className="form-control"
                                name="pharmacyContactNumInput"
                                placeholder="Contact Number"
                            />
                        </div>
                        <div className="form-group">
                            <Field
                                className="form-control"
                                name="pharmacyAddressInput"
                                placeholder="Pharmacy Address"
                            />
                        </div>

                        <button type="submit" class="btn btn-success">Sign up</button>
                    </Form>
                )}
            </Formik>
        </div>);
    }


    //Call this when user details pass validation
    submitNewUserToAPI() { }

}