import AssignmentOutlinedIcon from '../../node_modules/@material-ui/icons/AssignmentOutlined';
import PeopleOutline from '@material-ui/icons/PeopleOutline';
import SupervisorAccount from '@material-ui/icons/SupervisorAccount';
import LocalPharmacyOutlinedIcon from '@material-ui/icons/LocalPharmacyOutlined';
import '../../node_modules/@fortawesome/fontawesome-free/css/all.css';


import React, { Component } from "react";
import { blue } from '@material-ui/core/colors';

export default class HomeComponent extends Component {
  constructor(props) {
    super(props);

    this.state = { productFileHover: false, patientsHover: false, prescriptionsHover: false, covid19Hover: false };
  }

  render() {
    return (
      <div>


        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-3 col-sm-3 col-xs-12">
              <div className={this.state.productFileHover == false ? "card h-100  green-card-lt" : "card h-100 border-success card-shadow green-card"} onClick={() => this.props.history.push("/medicineStockList")} onMouseEnter={() => this.setState({ productFileHover: true })} onMouseLeave={() => this.setState({ productFileHover: false })}>
                <div className="card-body text-center">
                  {this.state.productFileHover == false ? <img src='/images/drug.png' height="100" /> : <img src='/images/drug.png' height="120" />}
                  <h4 className={"card-title menu-card-t"}>Medicine</h4>
                  <p className={"card-text menu-card-p"}>Manage Medicine Stock.</p>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-3 col-sm-3 col-xs-12">
              <div className={this.state.patientsHover == false ? "card h-100 green-card-lt" : "card h-100 border-success card-shadow green-card"} onClick={() => this.props.history.push("/patients")} onMouseEnter={() => this.setState({ patientsHover: true })} onMouseLeave={() => this.setState({ patientsHover: false })}>
                <div className="card-body text-center">
                  {this.state.patientsHover == false ? <img src='/images/patient.png' height="100" /> : <img src='/images/patient.png' height="120" />}
                  <h4 className={"card-title menu-card-t"}>Patients</h4>
                  <p className={"card-text menu-card-p"}>View your Patients.</p>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-3 col-sm-3 col-xs-12">
              <div className={this.state.prescriptionsHover == false ? "card h-100 green-card-lt" : "card h-100 border-success card-shadow green-card"} onClick={() => this.props.history.push("/prescriptions")} onMouseEnter={() => this.setState({ prescriptionsHover: true })} onMouseLeave={() => this.setState({ prescriptionsHover: false })}>
                <div className="card-body text-center">
                  {/* <LocalPharmacyOutlinedIcon style={{ fontSize: 90, color: "#5cb85c" }} /> */}
                  {this.state.prescriptionsHover == false ? <img src='/images/prescription.png' height="100" /> : <img src='/images/prescription.png' height="120" />}
                  <h4 className={"card-title menu-card-t"}>Prescriptions</h4>
                  <p className={"card-text menu-card-p"}>View your Prescriptions.</p>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-3 col-sm-3 col-xs-12">
              <div className={this.state.covid19Hover == false ? "card h-100 green-card-lt" : "card h-100 border-success card-shadow green-card"} onClick={() => this.props.history.push("/covid19")} onMouseEnter={() => this.setState({ covid19Hover: true })} onMouseLeave={() => this.setState({ covid19Hover: false })}>
                <div className="card-body text-center">
                  {/* <i className="fas fa-virus" style={{ fontSize: 90, color: "#5cb85c" }} /> */}
                  {this.state.covid19Hover == false ? <img src='/images/virus_logo.png' height="100" /> : <img src='/images/virus_logo.png' height="120" />}
                  <h4 className={"card-title menu-card-t"}>Covid-19</h4>
                  <p className={"card-text menu-card-p"}>Covid-19 data and statistics</p>
                </div>
              </div>
            </div>



          </div>
        </div>
      </div>
    );
  }
}
