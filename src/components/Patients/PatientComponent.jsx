import React, { Component } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import PatientService from "../../api/PatientService";

class PatientComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      patientId: Number(this.props.match.params.id),
      patientFirstName: "",
      patientSurname: "",
      dateOfBirth: new Date(),
      address: "",
      phoneNumber: "",
      pharmacyId: sessionStorage.getItem("AuthenticatedUser"),
      disableEdit: false
    };
    this.submitClicked = this.submitClicked.bind(this);
    this.validateForm = this.validateForm.bind(this);
    this.cancelForm = this.cancelForm.bind(this);
  }

  componentDidMount() {
    if (this.state.patientId === -1) {
      return;
    } else {
      PatientService.retrievePatientByID(this.state.patientId).then(response =>
        this.setState(
          {
            patientFirstName: response.data.patientFirstName,
            patientSurname: response.data.patientSurname,
            address: response.data.address,
            dateOfBirth: response.data.dateOfBirth,
            phoneNumber: response.data.phoneNumber,
            disableEdit: true
          },
          console.log(response),
          this.render()
        )
      );
    }
    //Call a Patient Service to get details from Service
  }

  formEditable = props => {
    return props;
  };

  validateForm(values) {
    let errors = {};
    if (!values.firstName) {
      errors.firstName = "First Name cannot be blank";
    }

    //Validate date
    if (!values.dateOfBirth) {
      errors.dateOfBirth = "Enter a valid date";
    }
    return errors;
  }

  cancelForm() {
    this.componentDidMount();
    //this.setState({ disableEdit: true });
  }

  submitClicked(values) {
    // console.log(values);

    let patient = {
      patientId: this.state.patientId,
      patientFirstName: values.firstName,
      patientSurname: values.lastName,
      dateOfBirth: values.dateOfBirth,
      address: values.address,
      pharmacyId: this.state.pharmacyId,
      phoneNumber: values.phoneNumber
    };

    //if patient Id =-1 then set post request

    if (patient.patientId == -1) {
      PatientService.addNewPatient(patient).then(() =>
        this.props.history.push(`/patients`)
      );
    } else {
      PatientService.updatePatient(patient).then(() =>
        this.props.history.push("/patients")
      );
    }

    //else send put request to update existing patient.

    //console.log(patient);
  }

  render() {
    let disabledEditing = this.state.disableEdit;
    console.log("Disabled editing:  " + disabledEditing);
    return (
      <div className="container">
        Patient Component. id of this patient is {this.state.patientId}
        <Formik
          initialValues={{
            firstName: this.state.patientFirstName,
            dateOfBirth: this.state.dateOfBirth,
            lastName: this.state.patientSurname,
            phoneNumber: this.state.phoneNumber,
            address: this.state.address
          }}
          onSubmit={this.submitClicked}
          validate={this.validateForm}
          enableReinitialize={true}
        >
          {props => (
            <Form>
              <fieldset className="form-group">
                <label>First Name</label>
                <ErrorMessage
                  name="firstName"
                  component="div"
                  className="bg-danger text-white"
                />
                <Field
                  className="form-control"
                  type="text"
                  name="firstName"
                  placeholder="Enter a name"
                  disabled={disabledEditing}
                />
              </fieldset>
              <fieldset className="form-group">
                <label>Last Name</label>
                {/* <ErrorMessage
                  name="lastName"
                  component="p"
                  className="text-danger"
                /> */}
                <Field
                  className="form-control"
                  type="text"
                  name="lastName"
                  placeholder="Enter Last name"
                  disabled={disabledEditing}
                />
              </fieldset>
              <fieldset className="form-group">
                <label>Date of Birth</label>
                <ErrorMessage
                  name="dateOfBirth"
                  component="div"
                  className="bg-danger text-white"
                />
                <Field
                  className="form-control"
                  type="date"
                  name="dateOfBirth"
                  disabled={disabledEditing}
                />
              </fieldset>
              <fieldset className="form-group">
                <label>Address</label>
                <ErrorMessage
                  name="address"
                  component="div"
                  className="bg-danger text-white"
                />
                <Field
                  className="form-control"
                  type="text"
                  name="address"
                  placeholder="Enter Patient Address Here"
                  disabled={disabledEditing}
                />
              </fieldset>
              {/* <fieldset>
                <select name="country-code" id="">
                  <option data-country-code="IRL" value="353">
                    IRL (+353)
                  </option>
                  <option data-country-code="GB" value="44">
                    UK (+44)
                  </option>
                  <option data-country-code="US" value="1">
                    USA (+1)
                  </option>
                </select>
              </fieldset> */}
              <fieldset className="form-group">
                <label>Phone Number</label>
                <ErrorMessage
                  name="phoneNumber"
                  component="div"
                  className="bg-danger text-white"
                />
                <Field
                  className="form-control"
                  type="text"
                  name="phoneNumber"
                  placeholder="Patient Number here"
                  disabled={disabledEditing}
                />
              </fieldset>
              {/* if new patient have save else update */}
              {this.state.patientId === -1 && (
                <button className="btn btn-success" type="submit">
                  Save new Patient
                </button>
              )}
              {this.state.patientId !== -1 && this.state.disableEdit == true && (
                <button
                  className="btn btn-primary"
                  type="button"
                  onClick={() => this.setState({ disableEdit: false })}
                >
                  Edit Patient details
                </button>
              )}
              {/* onCLick will call for a component to mount again so refresh page */}
              {this.state.patientId !== -1 && this.state.disableEdit == false && (
                <div>
                  <button
                    className="btn btn-warning"
                    type="reset"
                    onClick={this.cancelForm}
                  >
                    Cancel
                  </button>
                  <div className="container">
                    <button className="btn btn-primary" type="submit">
                      Update Patient Details
                    </button>
                  </div>
                </div>
              )}

              <div className="container">
                <button
                  onClick={() => this.props.history.push(`/patients`)}
                  className="btn btn-info"
                >
                  Back To All patients
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    );
  }
}

export default PatientComponent;
