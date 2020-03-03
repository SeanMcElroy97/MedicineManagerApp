import React, { Component } from "react";
import PatientService from "../../api/PatientService";
import MedicineService from "../../api/MedicineService";
import PrescriptionService from "../../api/PrescriptionService";
import { Formik, Field, Form, FieldArray } from "formik";

export default class PrescriptionComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      prescriptionId: Number(this.props.match.params.id),
      availablePatients: [],
      availableMedicine: [],
      patientOnPrescription: {},
      IdPatientOnPrescription: "",
      prescriptionLineItems: [{ medicineItem: {}, qty: 0 }],
      instructions: "",
      statusOfPrescription: ""
    };

    this.getAvailablePatients = this.getAvailablePatients.bind(this);
    this.getAvailableMedicine = this.getAvailableMedicine.bind(this);

    this.getPrescriptionLineItems = this.getPrescriptionLineItems.bind(this);

    this.submitPrescription = this.submitPrescription.bind(this);
  }

  getAvailablePatients() {
    PatientService.retrieveAllpatients().then(Response =>
      this.setState({ availablePatients: Response.data })
    );
  }

  getAvailableMedicine() {
    MedicineService.retrieveAllMedicines().then(Response =>
      this.setState({ availableMedicine: Response.data })
    );
  }

  componentDidMount() {
    this.getAvailablePatients();
    this.getAvailableMedicine();
    PrescriptionService.executeTest().then(
      console.log(this.state.availableMedicine)
    );
  }

  randomPrescription() {
    let prescription = {
      IdPatientOnPrescription: this.state.availablePatients[0],
      medicinesPrescribed: [
        this.state.availableMedicine[0],
        this.state.availableMedicine[1]
      ],
      instructions: "random prescriptions instructions"
    };

    //console.log(prescription);
    PrescriptionService.addAPrescription(prescription);
  }

  submitPrescription(values) {
    let patient = this.state.availablePatients.find(pat => pat.patientId === Number(values.IdPatientOnPrescription));
    let preLineItems = values.medicines.map(this.getPrescriptionLineItems);
    let status = values.status;
    let instructions = values.instructions;

    let prescription = {
      prescriptionId: this.state.prescriptionId,
      patientOnPrescription: patient,
      items: preLineItems,
      instructions: instructions,
      status: status
    }

    //if id = -1. i.e. new prescription 
    PrescriptionService.postAPrescription(prescription)
  }

  getPrescriptionLineItems(item) {
    let lineItem = { medicine: this.state.availableMedicine.find(med => med.barcode === item.medicineItem.medicineBarcode), quantity: item.qty }
    return lineItem
  }

  render() {
    let isDisabledEditing = false;

    return (
      <>

        <button className="btn btn-danger" onClick={this.randomPrescription}>
          TEST PRESCRIPTION POST
        </button>
        <div className="container"><h3>Prescription Component. id of this prescription is {this.state.prescriptionId}</h3></div>
        <Formik
          initialValues={{
            IdPatientOnPrescription: this.state.patientOnPrescription.patientId,
            medicines: this.state.prescriptionLineItems,
            instructions: this.state.instructions,
            status: this.state.statusOfPrescription
          }}
          enableReinitialize={true}
          onSubmit={this.submitPrescription}
        >
          {({ values }) => (
            <Form>
              <div className="container">
                <fieldset className="form-group">
                  <h4><label>Patient</label></h4>
                  <Field
                    className="form-control"
                    as="select"
                    name="IdPatientOnPrescription"
                  >
                    <option value="">Choose a Patient</option>
                    {this.state.availablePatients.map((patient, index) => {
                      return (
                        <option value={patient.patientId}>
                          {patient.patientFirstName +
                            "  ||  " +
                            patient.patientSurname +
                            "  ||  (D.O.B) " +
                            patient.dateOfBirth +
                            "  ||  (Patient ID) " +
                            patient.patientId}
                        </option>
                      );
                    })}
                  </Field>
                </fieldset>
              </div>

              <FieldArray name="medicines">
                {arrayHelpers => (
                  <>
                    {/* For each medicine on prescription*/}
                    {values.medicines.map((med, index) => {
                      return (
                        <div className="container">
                          <div key={med.medicineItem} className="form-row">
                            {/* <label>{`Medicine Item ${index + 1}`}</label> */}
                            <div className="col-9">
                              <h4><label>{`Medicine Item ${index + 1}`}</label></h4>
                              <Field
                                as="select"
                                name={`medicines[${index}].medicineItem.medicineBarcode`}
                                className="form-control"
                              >
                                <option value="">Choose a  prescription Line Item</option>
                                {/* this will cycle through available medicine to choose from */}
                                {this.state.availableMedicine.map(
                                  (availableMedicine, index) => {
                                    return (
                                      <option
                                        // value={availableMedicine.medicineBarcode}
                                        value={availableMedicine.barcode}
                                      >
                                        {/* What user sees in dropdown */}
                                        {availableMedicine.tradeName}
                                      </option>
                                    );
                                  }
                                )}
                              </Field>
                            </div>
                            <div className="col">
                              <h4><label>{`Quantity`}</label></h4>
                              <Field
                                className="form-control"
                                type="number"
                                name={`medicines[${index}].qty`}
                                disabled={isDisabledEditing}
                              />
                            </div>
                          </div>
                        </div>
                      );
                    })}
                    <div className="container">
                      <button
                        className="btn btn-outline-info btn-sm"
                        type="button"
                        onClick={() =>
                          arrayHelpers.push({
                          })
                        }
                      >
                        Add Medicine Item
                      </button>
                    </div>
                  </>
                )}
              </FieldArray>

              <div className="container">
                <h4><label>Instructions For Patient</label></h4>
                <Field
                  className="form-control"
                  as="textarea"
                  rows="4"
                  name="instructions"
                  disabled={isDisabledEditing}
                />
              </div>


              <div className="container">
                <h4><label>Prescription Status</label></h4>
                <div className="btn group btn-group-toggle btn-block">
                  < label className={(values.status == 'Being Prepared') ? "btn btn-info btn-lg col-4" : "btn btn-outline-info btn-lg col-4"} >
                    Being Prepared<Field name="status" type="radio" value="Being Prepared" autocomplete="off" />
                  </label>
                  <label className={(values.status == 'Ready') ? "btn btn-info btn-lg col-4" : "btn btn-outline-info btn-lg col-4"}>
                    Ready for pickup<Field name="status" type="radio" value="Ready" autocomplete="off" />
                  </label>
                  <label className={(values.status == 'Fulfilled') ? "btn btn-info btn-lg col-4" : "btn btn-outline-info btn-lg col-4"}>
                    Fulfilled<Field name="status" type="radio" value="Fulfilled" autocomplete="off" />
                  </label>
                </div>
              </div>


              <div className="container">
                <button
                  className="btn  btn-success btn-lg btn-block"
                  type="submit"
                >
                  Create Prescription
                </button>
              </div>
              <pre>{JSON.stringify(values, null, 2)}</pre>
              <pre>{JSON.stringify(this.state.instructions, null, 2)}</pre>
              {/* <pre>{JSON.stringify(this.state.availablePatients, null, 2)}</pre> */}
            </Form>
          )}
        </Formik>
      </>
    );
  }
}
