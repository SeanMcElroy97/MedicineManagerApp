import React, { Component } from "react";

export default class HomeComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <>
        <button onClick={() => this.props.history.push("/productfile")}>
          Update the Product file
        </button>
        <button onClick={() => this.props.history.push("/patients")}>
          Patients
        </button>
        <button>Prescriptions</button>
        <button>Stock Management</button>
        <button>Reports</button>
      </>
    );
  }
}
