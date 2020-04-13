import AssignmentOutlinedIcon from '../../node_modules/@material-ui/icons/AssignmentOutlined';
import PeopleOutline from '@material-ui/icons/PeopleOutline';
import SupervisorAccount from '@material-ui/icons/SupervisorAccount';
import LocalPharmacyOutlinedIcon from '@material-ui/icons/LocalPharmacyOutlined';
import '../../node_modules/@fortawesome/fontawesome-free/css/all.css';


import React, { Component } from "react";

export default class HomeComponent extends Component {
  constructor(props) {
    super(props);

    this.state = { productFileHover: false, patientsHover: false, prescriptionsHover: false, covid19Hover: false };
  }

  render() {
    return (
      <>
        <div className="container">
          <button onClick={() => this.props.history.push("/medicine")}>
            Update the Product file
          </button>
          <button onClick={() => this.props.history.push("/patients")}>
            Patients
          </button>
          <button onClick={() => this.props.history.push("/prescriptions")}>
            Prescriptions
          </button>
          <button>Stock Management</button>
          <button>Reports</button>
        </div >

        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-3 col-sm-3 col-xs-12">
              <div class={this.state.productFileHover == false ? "card h-100  green-card-lt" : "card h-100 border-success card-shadow green-card"} onClick={() => this.props.history.push("/medicine")} onMouseEnter={() => this.setState({ productFileHover: true })} onMouseLeave={() => this.setState({ productFileHover: false })}>
                <div class="card-body text-center">
                  <AssignmentOutlinedIcon style={this.state.productFileHover == false ? { fontSize: 100, color: "#5cb85c" } : { fontSize: 120, color: "#5cb85c" }} />
                  <h4 className={"card-title menu-card-t"}>Product File</h4>
                  <p className={"card-text menu-card-p"}>(Medicine data) View list of medicine or update medicine data.</p>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-3 col-sm-3 col-xs-12">
              <div class={this.state.patientsHover == false ? "card h-100 green-card-lt" : "card h-100 border-success card-shadow green-card"} onClick={() => this.props.history.push("/patients")} onMouseEnter={() => this.setState({ patientsHover: true })} onMouseLeave={() => this.setState({ patientsHover: false })}>
                <div class="card-body text-center">
                  <SupervisorAccount style={this.state.patientsHover == false ? { fontSize: 100, color: "#5cb85c" } : { fontSize: 120, color: "#5cb85c" }} />
                  <h4 className={"card-title menu-card-t"}>Patients</h4>
                  <p className={"card-text menu-card-p"}>View your Patients.</p>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-3 col-sm-3 col-xs-12">
              <div class={this.state.prescriptionsHover == false ? "card h-100 green-card-lt" : "card h-100 border-success card-shadow green-card"} onClick={() => this.props.history.push("/prescriptions")} onMouseEnter={() => this.setState({ prescriptionsHover: true })} onMouseLeave={() => this.setState({ prescriptionsHover: false })}>
                <div class="card-body text-center">
                  {/* <LocalPharmacyOutlinedIcon style={{ fontSize: 90, color: "#5cb85c" }} /> */}
                  {this.state.prescriptionsHover == false ? <img src='/images/prescription.png' height="100" /> : <img src='/images/prescription.png' height="120" />}
                  <h4 className={"card-title menu-card-t"}>Prescriptions</h4>
                  <p className={"card-text menu-card-p"}>View your Prescriptions.</p>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-3 col-sm-3 col-xs-12">
              <div class={this.state.covid19Hover == false ? "card h-100 green-card-lt" : "card h-100 border-success card-shadow green-card"} onClick={() => this.props.history.push("/covid19")} onMouseEnter={() => this.setState({ covid19Hover: true })} onMouseLeave={() => this.setState({ covid19Hover: false })}>
                <div class="card-body text-center">
                  {/* <i class="fas fa-virus" style={{ fontSize: 90, color: "#5cb85c" }} /> */}
                  {this.state.covid19Hover == false ? <img src='/images/virus_logo.png' height="100" /> : <img src='/images/virus_logo.png' height="120" />}
                  <h4 className={"card-title menu-card-t"}>Covid-19</h4>
                  <p className={"card-text menu-card-p"}>Covid-19 data and statistics</p>
                </div>
              </div>
            </div>



          </div>
        </div>
      </>
    );
  }
}
