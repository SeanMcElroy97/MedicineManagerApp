import React, { Component } from "../../../node_modules/react";
import PatientService from "../../api/PatientService";
import SearchIcon from "../../../node_modules/@material-ui/icons/Search";


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

  filterPatientList(event) {
    let typedString = event.target.value.trim();

    //Doesnt work for backspace

    let filteredArray = this.state.allPatients.filter(value =>
      value.patientFirstName.toUpperCase().includes(typedString.toUpperCase())
    );

    console.log(typedString);
    console.log(filteredArray);

    if (typedString.length == 0) {
      this.setState({ patients: this.state.allPatients });
    } else {
      this.setState({ patients: filteredArray });
    }
  }


  render() {
    return (
      <div className="container">
        <h1>Patients</h1>
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
          {this.state.displayedPatients.length < 1 && (
            <>
              <h1>You have no patients</h1>
              <button className="btn btn-success">Add New patient</button>
            </>
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
                      <td>{patient.dateOfBirth}</td>
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
}
