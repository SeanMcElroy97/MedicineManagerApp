import React, { Component } from "react";
import MedicineService from "../../api/MedicineService";
import { Formik, Field, Form } from "formik";

export default class MedicineItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      medicineBarcode: this.props.match.params.barcode,
      medicineItem: {},
      isDisabledEditing: true,
      stockItem: {}
    };
  }
  render() {

    let isDisabledEditing = true
    return (
      <div className="container">


        <fieldset className="form-group mt-3">
          <label>Trade Name</label>
          <input style={{ color: "purple", fontWeight: "bold" }} className="form-control" type="text" placeholder="TradeName here" defaultValue={this.state.medicineItem.tradeName} disabled={isDisabledEditing} />
        </fieldset>


        <fieldset className="form-group mt-3">
          <label>Ingredient List 1</label>
          <input style={{ color: "purple" }} className="form-control" type="text" name="mainIngredientOne" placeholder="(Ingredient List One)" defaultValue={this.state.medicineItem.ingredientList1} disabled={isDisabledEditing} />
        </fieldset>


        <div className="row mt-3">
          <div className="col">
            <fieldset className="form-group">
              <label>Barcode</label>
              <input style={{ color: "purple" }} className="form-control" type="text" name="reimbursementPrice" placeholder="(Barcode)" defaultValue={this.state.medicineItem.barcode} disabled={isDisabledEditing} />
            </fieldset>
          </div>

          <div className="col">
            <fieldset className="form-group ">
              <label>Medicine Status</label>
              <input style={{ color: "purple", fontWeight: "bold" }} className="form-control" type="text" placeholder="Medicine Status" defaultValue={this.state.medicineItem.medicineStatus} disabled={isDisabledEditing} />
            </fieldset>
          </div>
        </div>





        <div className="row mt-3">
          <div className="col">
            <fieldset className="form-group">
              <label>IPU Category</label>
              <input style={{ color: "purple" }} className="form-control" type="text" name="packSize" placeholder="(Package Size here)" defaultValue={this.state.medicineItem.ipuCategory} disabled={isDisabledEditing} />
            </fieldset>
          </div>

          <div className="col">
            <fieldset className="form-group">
              <label>Manufacture</label>
              <input style={{ color: "purple" }} className="form-control" type="text" name="manufacturer" placeholder="(Manufacturer here)" defaultValue={this.state.medicineItem.manufacturer} disabled={isDisabledEditing} />
            </fieldset>
          </div>
        </div>


        <div className="row mt-3">
          <div className="col">
            <fieldset className="form-group">
              <label>GMS number</label>
              <input style={{ color: "purple" }} className="form-control" type="text" name="genericName" placeholder="GMS number" defaultValue={this.state.medicineItem.gmsNumber} disabled={isDisabledEditing} />
            </fieldset>
          </div>

          <div className="col">
            <fieldset className="form-group">
              <label>Posison Classification</label>
              <input style={{ color: "purple" }} className="form-control" type="text" name="poisonClassification" placeholder="(poison classification)" defaultValue={this.state.medicineItem.pc} disabled={isDisabledEditing} />
            </fieldset>
          </div>
        </div>


        <fieldset className="form-group mt-3">
          <label>Generic Name</label>
          <input style={{ color: "purple" }} className="form-control" type="text" name="genericName" placeholder="(generic name)" defaultValue={this.state.medicineItem.genericName} disabled={isDisabledEditing} />
        </fieldset>

        <div className="row mt-3">
          <div className="col">
            <fieldset className="form-group">
              <label>Pack Size</label>
              <input style={{ color: "purple" }} className="form-control" type="text" name="warningCodesForLabels" placeholder="(pack size)" defaultValue={this.state.medicineItem.packSize} disabled={isDisabledEditing} />
            </fieldset>
          </div>

          <div className="col">
            <fieldset className="form-group">
              <label>Trade Price</label>
              <input style={{ color: "purple" }} className="form-control" type="text" name="warningCodesForLabels" placeholder="Trade Price" defaultValue={this.state.medicineItem.tradePrice} disabled={isDisabledEditing} />
            </fieldset>
          </div>
        </div>


        <div className="row mt-3">
          <div className="col">
            <fieldset className="form-group">
              <label>Warning Codes for Labels</label>
              <input style={{ color: "purple" }} className="form-control" type="text" name="warningCodesForLabels" placeholder="(warning code)" defaultValue={this.state.medicineItem.warnings} disabled={isDisabledEditing} />
            </fieldset>
          </div>
          <div className="col">
            <fieldset className="form-group">
              <label>Strength</label>
              <input style={{ color: "purple" }} className="form-control" type="text" name="strength" placeholder="(medicine strength)" defaultValue={this.state.medicineItem.strength} disabled={isDisabledEditing} />
            </fieldset>
          </div>
        </div>



        <div className="row mt-3">
          <div className="col">
            <fieldset className="form-group">
              <label>Forms</label>
              <input style={{ color: "purple" }} className="form-control" type="text" name="drugForms" placeholder="(drug form(s))" defaultValue={this.state.medicineItem.forms} disabled={isDisabledEditing} />
            </fieldset>
          </div>

          <div className="col">
            <fieldset className="form-group">
              <label>ATC CODE</label>
              <input style={{ color: "purple" }} className="form-control" type="text" name="mainIngredientOne" placeholder="ATC code" defaultValue={this.state.medicineItem.atc1} disabled={isDisabledEditing} />
            </fieldset>
          </div>
        </div>

        <div className="row mt-5">
          <div className="col  text-center">
            <button
              onClick={() => this.props.history.push(`/medicineStockList`)}
              className="btn btn-info"
            >
              Return To Medicine Stock
            </button>
          </div>
        </div>
      </div>
    );
  }

  componentDidMount() {
    this.retrieveMedicineItemDetails(this.state.medicineBarcode);
  }

  retrieveMedicineItemDetails(barcode) {
    MedicineService.fetchMedicineByBarcode(barcode).then(response => {
      console.log(response.data)
      this.setState({ medicineItem: response.data })
    }
    );

  }
}


