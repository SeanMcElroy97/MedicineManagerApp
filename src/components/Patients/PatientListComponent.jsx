import React, { Component } from "../../../node_modules/react";
import PatientService from "../../api/PatientService";
import SearchIcon from "../../../node_modules/@material-ui/icons/Search";


export default class patientListComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      patients: [],
      allPatients: []
      //filteredPatients: []
    };
    this.addPatient = this.addPatient.bind(this);
    this.filterPatientList = this.filterPatientList.bind(this);
  }

  componentDidMount() {
    console.log("component mounting");
    PatientService.retrieveAllpatients().then(response =>
      this.setState({ patients: response.data, allPatients: response.data })
    );

    // PatientService.retrieveAllpatients().then(response =>
    //   console.log(response)
    // );
  }

  filterPatientList(event) {
    let typedString = event.target.value.trim();

    //Doesnt work for backspace

    let filteredArray = this.state.allPatients.filter(value =>
      value.patientFirstName.toLowerCase().includes(typedString.toLowerCase())
    );

    console.log(typedString);
    console.log(filteredArray);

    if (typedString.length == 0) {
      this.setState({ patients: this.state.allPatients });
    } else {
      this.setState({ patients: filteredArray });
    }
  }

  goToPatient = patientID => {
    console.log("goToPatientClicked");
  };

  addPatient() {
    this.props.history.push("/patients/-1");
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
          {this.state.patients.length < 1 && (
            <>
              <h1>You have no patients</h1>
              <button className="btn btn-success">Add New patient</button>
            </>
          )}
          {this.state.patients.length >= 1 && (
            <>
              <div className="container">
                <button className="btn btn-success btn-lg" onClick={this.addPatient}>
                  Add New Patient
                </button>
              </div>
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
                  {this.state.patients.map(patient => (
                    <tr
                      key={patient.patientId}
                      onClick={() =>
                        this.props.history.push(
                          `/patients/${patient.patientId}`
                        )
                      }
                    >
                      <td>{patient.patientFirstName}</td>
                      <td>{patient.patientSurname}</td>
                      <td>{patient.dateOfBirth}</td>
                      <td>{patient.address}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}
        </div>
      </div>
    );
  }
}
