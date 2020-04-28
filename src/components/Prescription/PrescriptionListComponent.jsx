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

    this.filterPrescriptionList = this.filterPrescriptionList.bind(this);
  }

  componentDidMount() {
    console.log("component mounting");
    PrescriptionService.fetchAllPrescriptions().then(response => {
      this.setState({ prescriptions: response.data, prescriptionsOnDisplay: response.data })
      console.log(response.data)
    });

  }

  filterPrescriptionList(event) {
    let typedString = event.target.value.trim();

    let filteredByName = this.state.prescriptions.filter(value =>
      value.patientOnPrescription.patientFirstName.toLowerCase().includes(typedString.toLowerCase())
      ||
      value.patientOnPrescription.patientSurname.toLowerCase().includes(typedString.toLowerCase())
    );

    if (typedString.length == 0) {
      this.setState({ prescriptionsOnDisplay: this.state.prescriptions });
    } else {
      this.setState({ prescriptionsOnDisplay: filteredByName });
    }
  }


  render() {
    return (

      <div className="container">
        <h1>Prescriptions</h1>


        <div className="container">
          <Grid container spacing={3} justify="center" >
            <Grid item component={Card} xs={12} md={3} className={"covid-card-confirmed"}>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>Your Prescriptions</Typography>
                <Typography variant="h5">
                  <CountUp start={0} end={this.state.prescriptions.length} duration={2.5} separator="," />
                </Typography>
                {/* <Typography color="textSecondary">{this.state.todaysDate.toDateString()} 02:00 AM</Typography> */}
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

        <div className="row mt-5">
          {this.state.prescriptionsOnDisplay.map(prescription => (

            <div className="col-md-3 col-sm-6 mt-5" key={prescription.prescriptionID}>
              <div className="card text-white">
                <div onClick={() => this.props.history.push(`/prescriptions/${prescription.prescriptionID}`)} className={prescription.prescriptionStatus.toLowerCase == "ready" ? "card border border-primary" : prescription.status == "Being Prepared" ? "card border-info" : (prescription.status == "Fulfilled" ? "card border-success" : (prescription.status == "Ready" ? "card border-primary" : "card border-warning"))} >
                  <div className={prescription.prescriptionStatus == "Being Prepared" ? "card-header bg-info text-white" : (prescription.prescriptionStatus == "Fulfilled" ? "card-header bg-success text-white" : (prescription.prescriptionStatus == "Ready" ? "card-header bg-primary text-white" : "card-header bg-warning text-white"))}>{prescription.prescriptionStatus}</div>
                  <img className="card-img-top" src={prescription.prescriptionImageURI || "/images/sample-question-mark.png"} alt="Card image" />
                  <div className={prescription.prescriptionStatus.toLowerCase() == "submitted" ? "card-body bg-warning" : prescription.prescriptionStatus.toLowerCase() == "being prepared" ? "card-body bg-info" : (prescription.prescriptionStatus.toLowerCase() == "fulfilled" ? "card-body bg-secondary" : (prescription.prescriptionStatus.toLowerCase() == "ready" ? "card-body bg-primary" : "card-body bg-warning"))}>
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

        {/* Material ui checkbox */}
        <div className="container">
          <input type="checkbox" className="checkbox" value="Being Prepared" onClick={() => this.filterByPrescriptionStatus("Being Prepared")} />
        </div>

      </div>
    );
  }


  dateFormated = (longMillis) => {

    let date = new Date(longMillis);
    return date.getDate().toString();
  }
}
