import React, { Component } from "../../../node_modules/react";
import PatientService from "../../api/PatientService";
import SearchIcon from "../../../node_modules/@material-ui/icons/Search";
import { Card, CardContent, Typography, Grid } from '@material-ui/core';
import CountUp from 'react-countup';
import { format, compareAsc } from 'date-fns'


export default class patientListComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayedPatients: [],
      allPatients: []
    };
    this.getMyPatients = this.getMyPatients.bind(this);
    this.filterPatientList = this.filterPatientList.bind(this);


  }

  componentDidMount() {
    console.log("component mounting");
    this.getMyPatients();
  }

  getMyPatients() {
    PatientService.fetchMyPatients()
      .then(response => {
        this.setState({ displayedPatients: response.data, allPatients: response.data })
        console.log(response.data)
      })
      .catch(() => alert('Couldnt retrieve your patients'))
  }



  render() {
    return (
      <div className="container">
        <h1>Patients</h1>

        <div className="container">
          <Grid container spacing={3} justify="center" >
            <Grid item component={Card} xs={12} md={3} className={"covid-card-recovered"}>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>Patients</Typography>
                <Typography variant="h5">
                  <CountUp start={0} end={this.state.allPatients.length} duration={2.5} separator="," />
                </Typography>
                <Typography variant="body2">Your total patients </Typography>
              </CardContent>
            </Grid>
          </Grid>
        </div>

        <div align="right">
          <SearchIcon />
          <input
            id="search-input"
            type="text"
            onChange={this.filterPatientList}
            placeholder="Enter patient here"
          />
        </div>
        <div className="container">
          {this.state.allPatients.length < 1 && (

            <h1>You have no patients</h1>

          )}
          {this.state.displayedPatients.length >= 1 && (
            <div className="container">
              <table className="table">
                <thead>
                  <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>D.O.B</th>
                    <th>Address</th>
                  </tr>
                </thead>
                <tbody id="myTable">
                  {this.state.displayedPatients.map(patient => (
                    <tr
                      key={patient.patientID}
                      onClick={() => this.props.history.push(`/patients/${patient.patientID}`)}
                    >
                      <td>{patient.firstName}</td>
                      <td>{patient.lastName}</td>
                      <td>{format(new Date(patient.dateOfBirth), 'dd/MM/yyyy')}</td>
                      <td>{patient.patientAddress}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    );
  }
  filterPatientList(event) {
    let typedString = event.target.value.trim();

    let filteredArray = this.state.allPatients.filter(value =>
      value.lastName.toLowerCase().includes(typedString.toLowerCase())
    );

    if (typedString.length < 1) {
      this.setState({ displayedPatients: this.state.allPatients });
    } else {
      this.setState({ displayedPatients: filteredArray });
    }
  }

}
