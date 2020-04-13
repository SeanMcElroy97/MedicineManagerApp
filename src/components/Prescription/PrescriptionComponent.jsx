import React, { Component } from "../../../node_modules/react";
import PatientService from "../../api/PatientService";
import MedicineService from "../../api/MedicineService";
import PrescriptionService from "../../api/PrescriptionService";
import { Formik, Field, Form, FieldArray } from "../../../node_modules/formik";

export default class PrescriptionComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      prescriptionId: Number(this.props.match.params.id),
      availablePatients: [],
      availableMedicine: [],
      patientOnPrescription: {},
      IdPatientOnPrescription: "",
      prescriptionLineItems: [{ id: '', medicine: {}, qty: 0 }],
      instructions: "",
      statusOfPrescription: "",
      disableEdit: true
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
    if (this.state.prescriptionId === -1) {
      this.setState({
        disableEdit: false
      })
    } else {
      PrescriptionService.retrieveAPrescriptionById(this.state.prescriptionId).then(response => (
        this.setState({
          patientOnPrescription: response.data.patientOnPrescription,
          prescriptionLineItems: response.data.items,
          instructions: response.data.instructions,
          statusOfPrescription: response.data.status
        }),
        console.log('response data here'),
        console.log(response.data)
      )
      )
    }
    this.getAvailablePatients();
    this.getAvailableMedicine();
  }

  submitPrescription(values) {
    // let patient = this.state.availablePatients.find(pat => pat.patientId === Number(values.IdPatientOnPrescription));
    // let preLineItems = values.medicines.map(this.getPrescriptionLineItems);
    // let status = values.status;
    // let instructions = values.instructions;

    let patient = values.patientOnPrescription;
    let lineItemsOnPre = values.prescriptionLineItems;
    let instructions = values.instructions;
    let status = values.status;

    let prescription = {
      prescriptionId: this.state.prescriptionId,
      patientOnPrescription: patient,
      items: lineItemsOnPre,
      instructions: instructions,
      status: status
    }

    if (prescription.prescriptionId == -1) {
      PrescriptionService.postAPrescription(prescription)
    } else {
      alert('update prescription hit')
      console.log('gonna post this prescription')
      console.log(prescription)
    }
  }

  getPrescriptionLineItems(item) {
    let lineItem = { medicine: this.state.availableMedicine.find(med => med.barcode === item.medicineItem.medicineBarcode), quantity: item.qty }
    return lineItem
  }

  render() {
    let isDisabledEditing = false;
    return (
      <>
        <div className="container">
          <button type="button" className='btn btn-dark' onClick={() => this.props.history.push("/prescriptions")}>Go back to All patients</button>
          <h3>Prescription Component. id of this prescription is {this.state.prescriptionId}</h3>
        </div>
        <Formik
          initialValues={{
            patientOnPrescription: this.state.patientOnPrescription,
            prescriptionLineItems: this.state.prescriptionLineItems,
            instructions: this.state.instructions,
            status: this.state.statusOfPrescription,
            disableEdit: this.state.disableEdit
          }}
          enableReinitialize={true}
          onSubmit={this.submitPrescription}

        >
          {({ values }) => (

            <Form>
              {console.log('editable eqwals ' + values.editable)}
              <div className="container">
                <fieldset className="form-group">
                  <h4><label>Patient</label></h4>
                  <Field
                    className="form-control"
                    as="select"
                    name="patientOnPrescription"
                    disabled={values.disableEdit}
                  >
                    <option value={values.patientOnPrescription.patientId}>{values.patientOnPrescription.patientFirstName +
                      "  ||  " +
                      values.patientOnPrescription.patientSurname +
                      "  ||  (D.O.B) " +
                      values.patientOnPrescription.dateOfBirth +
                      "  ||  (Patient ID) " +
                      values.patientOnPrescription.patientId}</option>
                    {this.state.availablePatients.map((patient) => {
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

              {/* Each Line item */}
              <FieldArray name="prescriptionLineItems">
                {arrayHelpers => (
                  <>
                    {/* For each medicine on PRESCRIPTION*/}
                    {values.prescriptionLineItems.map((lineItem, index) => {
                      return (
                        <div className="container">
                          {console.log(`lineItem obj : ${index}`)}
                          {console.log(lineItem)}
                          <div key={lineItem.id} className="form-row">
                            {/* <label>{`Medicine Item ${index + 1}`}</label> */}
                            <div className="col-9">
                              <h4><label>{`Medicine Item ${index + 1}`}</label></h4>
                              <Field
                                as="select"
                                name={`prescriptionLineItems[${index}].medicine`}
                                className="form-control"
                                disabled={values.disableEdit}
                              >
                                <option value={lineItem.medicine.barcode}>{lineItem.medicine.tradeName}</option>
                                {/* this will cycle through available medicine to choose from */}
                                {this.state.availableMedicine.map(
                                  (availableMed) => {
                                    return (
                                      <option value={availableMed.barcode}>
                                        {/* What user sees in dropdown */}
                                        {availableMed.tradeName}
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
                                name={`prescriptionLineItems[${index}].quantity`}
                                disabled={values.disableEdit}
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
                        onClick={() => (values.disableEdit == false && arrayHelpers.push({ id: -1, medicine: {}, quantity: 1 }))}>
                        Add Prescription Line Item
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
                  disabled={values.disableEdit}
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

              {this.state.prescriptionId == -1 &&
                <div className="container">
                  <button
                    className="btn  btn-success btn-lg btn-block"
                    type="submit"
                  >
                    Create Prescription
                    </button>
                </div>}

              {this.state.prescriptionId != -1 &&
                <div className="container">
                  <button
                    className="btn  btn-success btn-lg btn-block"
                    type="submit"
                  >
                    Update Prescription
                    </button>
                </div>}
              <pre>{JSON.stringify(values, null, 2)}</pre>

            </Form>
          )}
        </Formik>
      </>
    );
  }

}


