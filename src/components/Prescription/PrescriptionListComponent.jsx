import React, { Component } from "../../../node_modules/react";
import PatientService from "../../api/PatientService";
import PrescriptionService from "../../api/PrescriptionService";
import SearchIcon from "../../../node_modules/@material-ui/icons/Search";

export default class prescriptionListComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      prescriptions: [],
      prescriptionsOnDisplay: [],
      beingPreparedChecked: false
    };

    this.goToPrescriptionClicked = this.goToPrescriptionClicked.bind(this);
    this.filterPrescriptionList = this.filterPrescriptionList.bind(this);
  }

  componentDidMount() {
    console.log("component mounting");
    PrescriptionService.retrieveAllPrescriptions().then(response =>
      this.setState({ prescriptions: response.data, prescriptionsOnDisplay: response.data })
    );

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

  goToPrescriptionClicked() {
    this.props.history.push("/prescriptions/-1");
  }

  filterByPrescriptionStatus(statusStr) {

    // if (statusStr.toLowerCase().equals("being prepared")) {
    //   this.setState({ beingPreparedChecked: !beingPreparedChecked });
    // }

    // if (this.state.beingPreparedChecked == true) {
    //   console.log(this.state.prescriptions)
    //   let filteredByStatus = this.state.prescriptions.filter(value =>
    //     value.status.toLowerCase().includes(statusStr.toLowerCase())
    //   );

    //   this.setState({ prescriptionsOnDisplay: filteredByStatus });
    // } else {
    //   this.setState({ prescriptionsOnDisplay: this.state.prescriptions });
    // }
  }

  render() {
    return (
      <>
        <div className="container">
          <h1>Prescriptions</h1>
          <div align="right">
            <SearchIcon />
            <input
              id="search-input"
              type="text"
              onChange={this.filterPrescriptionList}
              placeholder="Enter patient here"
            />
          </div>

          <input type="checkbox" className="checkbox" value="Being Prepared" onClick={() => this.filterByPrescriptionStatus("Being Prepared")} />

          <div className="container">
            <button className="btn btn-primary" onClick={this.goToPrescriptionClicked}>
              ADD new prescription
          </button>
          </div>
          <div className="row">
            {this.state.prescriptionsOnDisplay.map(prescription => (

              <div className="col-md-3 col-sm-6 mt-5">
                <div className="card text-white">
                  <div onClick={() => this.props.history.push(`/prescriptions/${prescription.prescriptionID}`)} className={prescription.status == "Being Prepared" ? "card border-info" : (prescription.status == "Fulfilled" ? "card border-success" : (prescription.status == "Ready" ? "card border-primary" : "card border-warning"))} >
                    <div className={prescription.status == "Being Prepared" ? "card-header bg-info text-white" : (prescription.status == "Fulfilled" ? "card-header bg-success text-white" : (prescription.status == "Ready" ? "card-header bg-primary text-white" : "card-header bg-warning text-white"))}>{prescription.status}</div>
                    <img className="card-img-top" src="sample-question-mark.png" alt="Card image" />
                    <div className={prescription.status == "Being Prepared" ? "card-body bg-info" : (prescription.status == "Fulfilled" ? "card-body bg-success" : (prescription.status == "Ready" ? "card-body bg-primary" : "card-body bg-warning"))}>
                      <h4 class="card-title">{prescription.patientOnPrescription.patientFirstName + ' ' + prescription.patientOnPrescription.patientSurname}</h4>
                      <p class="card-text">{prescription.status.toLowerCase() == "fulfilled" ? 'Fulfilled Date here' : '(Probably creation date)'}</p>
                    </div>
                    {/* <div className="card-footer">Footer</div> */}
                  </div>
                </div>
              </div>
            ))}

          </div>
        </div>

        <pre>{JSON.stringify(this.state, null, 2)}</pre>
      </>
    );
  }
}
