import React, { Component } from "../../../node_modules/react";
import PatientService from "../../api/PatientService";
import PrescriptionService from "../../api/PrescriptionService";
import SearchIcon from "../../../node_modules/@material-ui/icons/Search";
import { Card, CardContent, Typography, Grid } from '@material-ui/core';
import CountUp from 'react-countup';


export default class prescriptionListComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      prescriptions: [],
      prescriptionsOnDisplay: [],
      beingPreparedChecked: false
    };

    // this.filterPrescriptionList = this.filterPrescriptionList.bind(this);
    this.getCardHeaderColor = this.getCardHeaderColor.bind(this);
    this.getCardBodyColor = this.getCardBodyColor.bind(this);
    this.getCardBorderColor = this.getCardBorderColor.bind(this)
  }

  componentDidMount() {
    console.log("component mounting");
    PrescriptionService.fetchAllPrescriptions().then(response => {
      this.setState({ prescriptions: response.data, prescriptionsOnDisplay: response.data })
      console.log(response.data)
    });

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


  render() {
    return (

      <div className="container">
        <h1>Prescriptions</h1>
        {/* Material ui checkbox */}

        <div className="container">
          <Grid container spacing={3} justify="center" >
            <Grid item component={Card} xs={12} md={3} className={"covid-card-confirmed"}>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>Your Prescriptions</Typography>
                <Typography variant="h5">
                  <CountUp start={0} end={this.state.prescriptions.length} duration={2.5} separator="," />
                </Typography>
                <Typography variant="body2">Total Prescriptions</Typography>
              </CardContent>
            </Grid>
          </Grid>

        </div>

        <div className="container">
          <div align="right">
            <SearchIcon />
            <input id="search-input" type="text" onChange={this.filterPrescriptionList} placeholder="Enter prescription here" />
          </div>
        </div>




        <div className="row mt-3">
          {this.state.prescriptionsOnDisplay.map(prescription => (

            <div className="col-md-3 col-sm-6 mt-5" key={prescription.prescriptionID}>
              <div className="card text-white">
                <div onClick={() => this.props.history.push(`/prescriptions/${prescription.prescriptionID}`)} className={this.getCardBorderColor(prescription.prescriptionStatus)}>

                  <div className={this.getCardHeaderColor(prescription.prescriptionStatus)}>{prescription.prescriptionStatus}</div>
                  <img className="card-img-top" src={prescription.prescriptionImageURI || "/images/sample-question-mark.png"} alt="Card image" />
                  <div className={this.getCardBodyColor(prescription.prescriptionStatus.toLowerCase())}>

                    <h4 className="card-title">{prescription.patientFirstName + ' ' + prescription.patientLastName}</h4>
                    <p className="card-text">{prescription.prescriptionLineItems.length} Line Items</p>
                    {/* <p className="card-text">{prescription.prescriptionStatus.toLowerCase() == "fulfilled" ? 'Fulfilled Date here' : '(Probably creation date)'}</p> */}
                    <p className="card-text">Created {this.dateFormated(prescription.prescriptionCreationDate)} </p>
                  </div>
                </div>
              </div>
            </div>
          ))}

        </div>
      </div>
    );
  }


  dateFormated = (longMillis) => {

    let date = new Date(longMillis);
    return date.getDate().toString();
  }
}
