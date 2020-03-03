import React, { Component } from "react";
import MedicineService from "../../api/MedicineService";
import { Formik, Field, Form } from "formik";

class MedicineComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      medicineBarcode: this.props.match.params.idBarcode,
      medicine: {},
      tod: "hi"
    };
  }
  render() {
    let isDisabledEditing = true;
    return (
      <>
        <Formik
          initialValues={{
            tradeName: this.state.medicine.tradeName,
            packSize: this.state.medicine.packSize,
            manufacturer: this.state.medicine.manufacturer,
            reimbursementPrice: this.state.medicine.reimbursementPrice,
            poisonClassification: this.state.medicine.poisonClassification,
            genericName: this.state.medicine.genericName,
            warningCodesForLabels: this.state.medicine.warningCodesForLabels,
            strength: this.state.medicine.strength,
            drugForms: this.state.formsOfDrug,
            mainIngredientOne: this.state.ingredientOne,
            mainIngredientTwo: this.state.ingredientTwo,
            mainIngredientThree: this.state.ingredientThree,
            mainIngredientFour: this.state.ingredientFour,
            ElectronicPOS: this.state.eposCategory
          }}
          enableReinitialize={true}
        >
          {props => (
            <Form className="container">
              <fieldset className="form-group">
                <label>Trade Name</label>
                <Field
                  className="form-control"
                  type="text"
                  name="tradeName"
                  placeholder="(Trade Name here)"
                  disabled={isDisabledEditing}
                />
              </fieldset>

              <fieldset className="form-group">
                <label>Package Size</label>
                <Field
                  className="form-control"
                  type="text"
                  name="packSize"
                  placeholder="(Package Size here)"
                  disabled={isDisabledEditing}
                />
              </fieldset>

              <fieldset className="form-group">
                <label>Manufacture</label>
                <Field
                  className="form-control"
                  type="text"
                  name="manufacturer"
                  placeholder="(Manufacturer here)"
                  disabled={isDisabledEditing}
                />
              </fieldset>

              <fieldset className="form-group">
                <label>Reimbursement Price</label>
                <Field
                  className="form-control"
                  type="text"
                  name="reimbursementPrice"
                  placeholder="(Reimbursement price)"
                  disabled={isDisabledEditing}
                />
              </fieldset>

              <fieldset className="form-group">
                <label>Posison Classification</label>
                <Field
                  className="form-control"
                  type="text"
                  name="poisonClassification"
                  placeholder="(poison classification)"
                  disabled={isDisabledEditing}
                />
              </fieldset>

              <fieldset className="form-group">
                <label>Generic Name</label>
                <Field
                  className="form-control"
                  type="text"
                  name="genericName"
                  placeholder="(generic name)"
                  disabled={isDisabledEditing}
                />
              </fieldset>

              <fieldset className="form-group">
                <label>Warning Codes for Labels</label>
                <Field
                  className="form-control"
                  type="text"
                  name="warningCodesForLabels"
                  placeholder="(warning code)"
                  disabled={isDisabledEditing}
                />
              </fieldset>

              <fieldset className="form-group">
                <label>Strength</label>
                <Field
                  className="form-control"
                  type="text"
                  name="strength"
                  placeholder="(medicine strength)"
                  disabled={isDisabledEditing}
                />
              </fieldset>

              <fieldset className="form-group">
                <label>Form of Drug</label>
                <Field
                  className="form-control"
                  type="text"
                  name="drugForms"
                  placeholder="(drug form(s))"
                  disabled={isDisabledEditing}
                />
              </fieldset>

              <fieldset className="form-group">
                <label>Main Ingredient 1</label>
                <Field
                  className="form-control"
                  type="text"
                  name="mainIngredientOne"
                  placeholder="(Ingredient One)"
                  disabled={isDisabledEditing}
                />
              </fieldset>

              <fieldset className="form-group">
                <label>Main Ingredient 2</label>
                <Field
                  className="form-control"
                  type="text"
                  name="mainIngredientTwo"
                  placeholder="(Ingredient Two)"
                  disabled={isDisabledEditing}
                />
              </fieldset>

              <fieldset className="form-group">
                <label>Main Ingredient 3</label>
                <Field
                  className="form-control"
                  type="text"
                  name="mainIngredientThree"
                  placeholder="(Ingredient Three)"
                  disabled={isDisabledEditing}
                />
              </fieldset>

              <fieldset className="form-group">
                <label>Main Ingredient 4</label>
                <Field
                  className="form-control"
                  type="text"
                  name="mainIngredientFour"
                  placeholder="(Ingredient Four)"
                  disabled={isDisabledEditing}
                />
              </fieldset>

              <fieldset className="form-group">
                <label>Electronic Point Of Sale</label>
                <Field
                  className="form-control"
                  type="text"
                  name="ElectronicPOS"
                  placeholder="(Electronic POS)"
                  disabled={isDisabledEditing}
                />
              </fieldset>
            </Form>
          )}
        </Formik>
        <div class="row">
          <div class="col  text-center">
            <button
              onClick={() => this.props.history.push(`/medicine`)}
              className="btn btn-info"
            >
              Return To All Medicine
            </button>
          </div>
        </div>
      </>
    );
  }

  componentDidMount() {
    this.retrieveMedicine(this.state.medicineBarcode);
  }

  retrieveMedicine(medID) {
    MedicineService.retrieveMedByID(medID).then(response =>
      this.setState({
        medicine: response.data
      })
    );
  }
}

export default MedicineComponent;
