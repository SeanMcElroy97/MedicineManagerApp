import React, { Component } from "../../../node_modules/react";
import PatientService from "../../api/PatientService";
import { Card, CardContent, Typography, Grid } from '@material-ui/core';
import CountUp from 'react-countup';

export default class PatientComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      patient: {},
      patientPrescriptions: [],
      displayedPatientPrescriptions: [],
      patientID: this.props.match.params.patientID
    };

  }

  componentDidMount() {

    PatientService.fetchPatientById(this.state.patientID)


    PatientService.fetchPatientPrescriptions(this.state.patientID)
      .then(response => {
        this.setState({ patientPrescriptions: response.data, displayedPatientPrescriptions: response.data })
        console.log(response)
      })
    //Call a Patient Service to get details from Service
  }


  // backgroundColor = ({status}){
  //   return 
  // }

  //Card Text color =

  render() {
    let disabledEditing = true;

    return (
      <div className="container">
        <div className="container">
          Patient Component. id of this patient is {this.props.match.params.patientID}
        </div>
        <div className="row">
          <Grid container spacing={3} justify="center" >
            <Grid item component={Card} xs={12} md={3} className={"covid-card-confirmed"}>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>Patient Prescriptions</Typography>
                <Typography variant="h5">
                  <CountUp start={0} end={this.state.patientPrescriptions.length} duration={2.5} separator="," />
                </Typography>
                {/* <Typography color="textSecondary">{this.state.todaysDate.toDateString()} 02:00 AM</Typography> */}
                <Typography variant="body2">Number of patient's prescriptions</Typography>
              </CardContent>
            </Grid>
          </Grid>
        </div>


        <div className="row mt-5">
          {this.state.displayedPatientPrescriptions.map(prescription => (

            <div className="col-md-3 col-sm-6 mt-5">
              <div className="card text-white">
                <div onClick={() => this.props.history.push(`/prescriptions/${prescription.prescriptionID}`)} className={prescription.prescriptionStatus.toLowerCase == "ready" ? "card border border-primary" : prescription.status == "Being Prepared" ? "card border-info" : (prescription.status == "Fulfilled" ? "card border-success" : (prescription.status == "Ready" ? "card border-primary" : "card border-warning"))} >
                  <div className={prescription.prescriptionStatus == "Being Prepared" ? "card-header bg-info text-white" : (prescription.prescriptionStatus == "Fulfilled" ? "card-header bg-success text-white" : (prescription.prescriptionStatus == "Ready" ? "card-header bg-primary text-white" : "card-header bg-warning text-white"))}>{prescription.prescriptionStatus}</div>
                  <img className="card-img-top" src="/images/sample-question-mark.png" alt="Card image" />
                  <div className={prescription.prescriptionStatus.toLowerCase() == "submitted" ? "card-body bg-warning" : prescription.prescriptionStatus.toLowerCase() == "being prepared" ? "card-body bg-info" : (prescription.prescriptionStatus.toLowerCase() == "fulfilled" ? "card-body bg-secondary" : (prescription.prescriptionStatus.toLowerCase() == "ready" ? "card-body bg-primary" : "card-body bg-warning"))}>
                    {/* <h4 class="card-title">Line Items on Prescription {prescription.prescriptionLineItems.length}</h4> */}
                    <p class="card-text">{prescription.prescriptionLineItems.length} Line Items</p>
                    <p class="card-text">{prescription.prescriptionStatus.toLowerCase() == "fulfilled" ? 'Fulfilled Date here' : '(Probably creation date)'}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}

        </div>

      </div>
    );
  }
}


