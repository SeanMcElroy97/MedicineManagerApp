import React, { Component } from "react";
import PatientService from "../../api/PatientService";
import PrescriptionService from "../../api/PrescriptionService";

export default class prescriptionListComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      prescriptions: [],
    };

    this.goToPrescriptionClicked = this.goToPrescriptionClicked.bind(this);
  }

  componentDidMount() {
    console.log("component mounting");
    PrescriptionService.retrieveAllPrescriptions().then(response =>
      this.setState({ prescriptions: response.data })
    );
  }

  // filterPatientList(event) {
  //   let typedString = event.target.value.trim();

  //   //Doesnt work for backspace

  //   let filteredArray = this.state.allPatients.filter(value =>
  //     value.patientFirstName.toLowerCase().includes(typedString.toLowerCase())
  //   );

  //   console.log(typedString);
  //   console.log(filteredArray);

  //   if (typedString.length == 0) {
  //     this.setState({ patients: this.state.allPatients });
  //   } else {
  //     this.setState({ patients: filteredArray });
  //   }
  // }

  goToPrescriptionClicked() {
    this.props.history.push("/prescriptions/-1");
  }

  render() {
    return (
      <>
        <div className="container">
          <h1>Prescriptions</h1>
          <div className="container">
            <button className="btn btn-primary" onClick={this.goToPrescriptionClicked}>
              ADD new prescription
          </button>
          </div>
          <div className="row">
            {this.state.prescriptions.map(prescription => (
              <div className="col-md-3 col-sm-6 mt-5">
                <div className={prescription.status == "Being Prepared" ? "card border-info" : (prescription.status == "Fulfilled" ? "card border-success" : (prescription.status == "Ready" ? "card border-primary" : ""))} >
                  <div className={prescription.status == "Being Prepared" ? "card-header bg-info text-white" : (prescription.status == "Fulfilled" ? "card-header bg-success text-white" : (prescription.status == "Ready" ? "card-header bg-primary text-white" : ""))}>{prescription.status}</div>
                  <img className="card-img-top" src="sample-question-mark.png" alt="Card image" />
                  <div className="card-body">
                    <h4 class="card-title">{prescription.patientOnPrescription.patientFirstName + ' ' + prescription.patientOnPrescription.patientSurname}</h4>
                    <p class="card-text">Some example text.</p>
                  </div>
                  {/* <div className="card-footer">Footer</div> */}
                </div>
              </div>))}

          </div>
        </div>

        <pre>{JSON.stringify(this.state, null, 2)}</pre>
      </>
    );
  }
}
