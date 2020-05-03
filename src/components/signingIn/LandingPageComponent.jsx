import React, { Component } from "../../../node_modules/react";
import LoginComponent from "./LoginComponent";
import SignUpComponent from "./SignUpComponent";


export default class LandingPageComponent extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="container">

                <img src='/images/patient_pal_icon.png' height="200" />

                <div className="row mt-3">
                    <div className="col-md-6 padding-0 border-right border-3 border-success"><SignUpComponent history={this.props.history} /></div>
                    <div className="col-md-6 padding-0 border-left border-3 border-success"><LoginComponent history={this.props.history} /></div>
                </div>
            </div>
        )
    }
}