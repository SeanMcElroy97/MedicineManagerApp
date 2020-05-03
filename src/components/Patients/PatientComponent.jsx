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
    this.getCardHeaderColor = this.getCardHeaderColor.bind(this)
    this.getCardBodyColor = this.getCardBodyColor.bind(this)
    this.getCardBorderColor = this.getCardBorderColor.bind(this)
    //
    this.filterPrescriptionList = this.filterPrescriptionList.bind(this)
  }

  componentDidMount() {

    // PatientService.fetchPatientById(this.state.patientID)
    //   .then(response => console.log(response))

    PatientService.fetchPatientById(this.state.patientID).then(response => {
      console.log(response.data)
      this.setState({ patient: response.data })
    })

    PatientService.fetchPatientPrescriptions(this.state.patientID)
      .then(response => {
        this.setState({ patientPrescriptions: response.data, displayedPatientPrescriptions: response.data })
        console.log(response)
      }).then(() => this.getPrescriptionsCancelled()).then(() => {
        this.getPrescriptionsFulfilled()
        this.filterPrescriptionList()
      })


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
          <h3>Patient:  {this.state.patient.firstName} {this.state.patient.lastName}</h3>
          <h3>Phone Number: {this.state.patient.phoneNumber}</h3>
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
                <div onClick={() => this.props.history.push(`/prescriptions/${prescription.prescriptionID}`)} className={this.getCardBorderColor(prescription.prescriptionStatus.toLowerCase())}>
                  <div className={this.getCardHeaderColor(prescription.prescriptionStatus.toLowerCase())}>{prescription.prescriptionStatus}</div>
                  <img className="card-img-top" src={prescription.prescriptionImageURI || "/images/sample-question-mark.png"} alt="Card image" />
                  <div className={this.getCardBodyColor(prescription.prescriptionStatus.toLowerCase())}>
                    {/* <p className="card-text">{prescription.prescriptionLineItems.length} Line Items</p> */}
                    <p className="card-text">{prescription.prescriptionStatus.toLowerCase() == "fulfilled" ? 'Fulfilled ' + format(new Date(prescription.prescriptionFulfilmentDate), 'hh:mm, dd/MM/yyyy') : 'Created ' + format(new Date(prescription.prescriptionCreationDate), 'hh:mm, dd/MM/yyyy')}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}

        </div>

      </div>
    );
  }


  getCardHeaderColor(status) {
    switch (status.toLowerCase()) {
      case 'fulfilled':
        return 'card-header bg-secondary text-white'
      case 'ready':
        return 'card-header bg-success text-white'
      case 'submitted':
        return 'card-header bg-warning text-dark'
      case 'cancelled':
        return 'card-header bg-danger text-white'
      default:
        return 'card-header bg-primary text-white'
      // code block
    }
  }

  getCardBodyColor(status) {
    switch (status.toLowerCase()) {
      case 'fulfilled':
        return 'card-body bg-secondary text-white'
      case 'ready':
        return 'card-body bg-success text-white'
      case 'submitted':
        return 'card-body bg-warning text-dark'
      case 'cancelled':
        return 'card-body bg-danger text-white'
      default:
        return 'card-body bg-primary text-white'
      // code block
    }
  }

  getCardBorderColor(status) {
    switch (status.toLowerCase()) {
      case 'fulfilled':
        return 'card border border-secondary'
      case 'ready':
        return 'card border border-success'
      case 'submitted':
        return 'card border border-warning'
      case 'cancelled':
        return 'card border border-danger'
      default:
        return 'card border border-primary'
      // code block
    }
  }


  filterPrescriptionList() {
    let originalList = Object.assign([], this.state.patientPrescriptions)

    originalList.sort((a, b) => (a.prescriptionCreationDate < b.prescriptionCreationDate) ? 1 : -1)

    this.setState({ displayedPatientPrescriptions: originalList, patientPrescriptions: originalList })
  }

}


