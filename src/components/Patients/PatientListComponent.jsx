import React, { Component } from "react";

export default class patientListComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      patients: [
        { id: 1, firstName: "John", lastName: "Doe", DOB: new Date() },
        { id: 2, firstName: "Jessica", lastName: "Doe", DOB: new Date() },
        { id: 3, firstName: "Joe", lastName: "Rogan", DOB: new Date() }
      ]
    };
  }

  render() {
    return (
      <div className="container">
        <h1>List Patients</h1>
        <div className="container">
          <table className="table">
            <thead>
              <tr>
                <th>first name</th>
                <th>last name</th>
                <th>D.O.B</th>
              </tr>
            </thead>
            <tbody>
              {this.state.patients.map(patient => (
                <tr key={patient.id}>
                  <td>{patient.firstName}</td>
                  <td>{patient.lastName}</td>
                  <td>{patient.DOB.toString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
