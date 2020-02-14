import React, { Component } from "react";

class PatientComponent extends Component {
  render() {
    return (
      <div>
        Patient Component. id of this patient is {this.props.match.params.id}
      </div>
    );
  }
}

export default PatientComponent;
