import React, { Component } from "../../../node_modules/react";
import PatientService from "../../api/PatientService";
import { Card, CardContent, Typography, Grid } from '@material-ui/core';
import CountUp from 'react-countup';

import { format, compareAsc } from 'date-fns'


export default class PatientComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      patient: {},
      patientPrescriptions: [],
      displayedPatientPrescriptions: [],
      patientID: this.props.match.params.patientID,
      prescriptionsCancelled: [],
      prescriptionsFulfilled: []
    };

    this.getPrescriptionsCancelled = this.getPrescriptionsCancelled.bind(this)
    this.getPrescriptionsFulfilled = this.getPrescriptionsFulfilled.bind(this)
  }

  componentDidMount() {

    PatientService.fetchPatientById(this.state.patientID)


    PatientService.fetchPatientPrescriptions(this.state.patientID)
      .then(response => {
        this.setState({ patientPrescriptions: response.data, displayedPatientPrescriptions: response.data })
        console.log(response)
      }).then(() => this.getPrescriptionsCancelled()).then(() => this.getPrescriptionsFulfilled())


    //Call a Patient Service to get details from Service
  }

  getPrescriptionsCancelled() {
    let cancelledArr = []
    for (let i = 0; i < this.state.patientPrescriptions.length; i++) {
      if (this.state.patientPrescriptions[i].prescriptionStatus.toLowerCase() == 'cancelled') {
        cancelledArr.push(this.state.patientPrescriptions[i])
      }
    }
    console.log(cancelledArr.length)

    this.setState({ prescriptionsCancelled: cancelledArr })
  }

  getPrescriptionsFulfilled() {
    let fulfilled = []
    for (let i = 0; i < this.state.patientPrescriptions.length; i++) {
      if (this.state.patientPrescriptions[i].prescriptionStatus.toLowerCase() == 'fulfilled') {
        fulfilled.push(this.state.patientPrescriptions[i])
      }
    }


    this.setState({ prescriptionsFulfilled: fulfilled })
  }

  sortByNewestDate(prescriptions) {

  }

  render() {
    let disabledEditing = true;



    return (
      <div className="container">
        <div className="container">
          Patient Component. id of this patient is {this.props.match.params.patientID}
        </div>
        <div className="row">
          <Grid container spacing={3} justify="center" >
            <Grid item component={Card} xs={12} md={3} className={"covid-card-recovered"}>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>Prescriptions Fulfilled</Typography>
                <Typography variant="h5">
                  <CountUp start={0} end={this.state.prescriptionsFulfilled.length} duration={2.5} separator="," />
                </Typography>
                {/* <Typography color="textSecondary">{this.state.todaysDate.toDateString()} 02:00 AM</Typography> */}
                <Typography variant="body2">Number of patient's prescriptions Fulfilled</Typography>
              </CardContent>
            </Grid>
            <Grid item component={Card} xs={12} md={3} className={"covid-card-confirmed"}>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>Patient Prescriptions</Typography>
                <Typography variant="h5">
                  <CountUp start={0} end={this.state.patientPrescriptions.length} duration={2.5} separator="," />
                </Typography>
                {/* <Typography color="textSecondary">{this.state.todaysDate.toDateString()} 02:00 AM</Typography> */}
                <Typography variant="body2">Total number of patient's prescriptions</Typography>
              </CardContent>
            </Grid>
            <Grid item component={Card} xs={12} md={3} className={"covid-card-deaths"}>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>Prescriptions Cancelled</Typography>
                <Typography variant="h5">
                  <CountUp start={0} end={this.state.prescriptionsCancelled.length} duration={2.5} separator="," />
                </Typography>
                {/* <Typography color="textSecondary">{this.state.todaysDate.toDateString()} 02:00 AM</Typography> */}
                <Typography variant="body2">Number of patient's prescriptions</Typography>
              </CardContent>
            </Grid>
          </Grid>
        </div>


        <div className="row mt-5">
          {this.state.displayedPatientPrescriptions.map(prescription => (

            <div className="col-md-3 col-sm-6 mt-5" key={prescription.prescriptionID}>
              <div className="card text-white">
                <div onClick={() => this.props.history.push(`/prescriptions/${prescription.prescriptionID}`)} className={prescription.prescriptionStatus.toLowerCase == "ready" ? "card border border-primary" : prescription.status == "Being Prepared" ? "card border-info" : (prescription.status == "Fulfilled" ? "card border-success" : (prescription.status == "Ready" ? "card border-primary" : "card border-warning"))} >
                  <div className={prescription.prescriptionStatus == "Being Prepared" ? "card-header bg-info text-white" : (prescription.prescriptionStatus == "Fulfilled" ? "card-header bg-success text-white" : (prescription.prescriptionStatus == "Ready" ? "card-header bg-primary text-white" : "card-header bg-warning text-white"))}>{prescription.prescriptionStatus}</div>
                  <img className="card-img-top" src={prescription.prescriptionImageURI || "/images/sample-question-mark.png"} alt="Card image" />
                  <div className={prescription.prescriptionStatus.toLowerCase() == "submitted" ? "card-body bg-warning" : prescription.prescriptionStatus.toLowerCase() == "being prepared" ? "card-body bg-info" : (prescription.prescriptionStatus.toLowerCase() == "fulfilled" ? "card-body bg-secondary" : (prescription.prescriptionStatus.toLowerCase() == "ready" ? "card-body bg-primary" : "card-body bg-warning"))}>
                    {/* <p className="card-text">{prescription.prescriptionLineItems.length} Line Items</p> */}
                    <p className="card-text">{prescription.prescriptionStatus.toLowerCase() == "fulfilled" ? 'Fulfilled ' + format(new Date(prescription.prescriptionFulfilmentDate), 'hh:mm, MM/dd/yyyy') : 'Created ' + format(new Date(prescription.prescriptionCreationDate), 'hh:mm, MM/dd/yyyy')}</p>
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


