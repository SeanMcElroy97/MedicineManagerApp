import PrescriptionService from '../../api/PrescriptionService';
import React from 'react'

import { Formik } from "formik";
import { TextField, Button } from "@material-ui/core";

import moment from 'moment';

export default class PrescriptionComponent extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            prescriptionID: this.props.match.params.prescriptionID,
            prescription: {},
            prescriptionLineItems: [],
            availableMedicine: [],
        }
        this.fetchLineItems = this.fetchLineItems.bind(this)
        this.fetchAllAvailableMedicine = this.fetchAllAvailableMedicine.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleLineItemChange = this.handleLineItemChange.bind(this)
        this.addPrescriptionLineItem = this.addPrescriptionLineItem.bind(this)
    }

    componentDidMount() {
        PrescriptionService.fetchPrescriptionById(this.state.prescriptionID)
            .then(response => {
                console.log(response.data)
                this.setState({ prescription: response.data })

                this.fetchLineItems()
            })
    }

    fetchLineItems() {
        // console.log('id ' + this.state.prescription.prescriptionID)

        PrescriptionService.fetchPrescriptionLineItemsById(this.state.prescription.prescriptionID)
            .then(response => {
                console.log(response)
                this.setState({ prescriptionLineItems: response.data })
                this.fetchAllAvailableMedicine()
            })
    }

    fetchAllAvailableMedicine() {
        // PrescriptionService.fetchAllAvailableMedicine()
        //     .then(response => {
        //         console.log(response)
        //         this.setState({ availableMedicine: response.data })
        //     })
    }


    handleChange(event) {
        console.log(event.target.value)
        this.setState({ value: event.target.value });
    }

    handleLineItemChange(event) {
        console.log(event.target.value)
        // this.setState({ value: event.target.value });
    }

    render() {
        let isDisabledEditing = false;





        return <div className="container">
            <div className="row">
                <div className="col-8">

                    <div className="row mt-3">
                        <fieldset className="col">
                            <label>Patient First Name</label>
                            <input style={{ color: "purple", fontWeight: "normal" }} className="form-control" type="text" placeholder="Patient First Name here" value={this.state.prescription.patientFirstName || ''} onChange={this.handleChange} disabled={true} />
                        </fieldset>

                        <fieldset className="col">
                            <label>Patient Last Name</label>
                            <input style={{ color: "purple" }} className="form-control" type="text" placeholder="Patient Last Name here" value={this.state.prescription.patientLastName || ''} onChange={this.handleChange} disabled={true} />
                        </fieldset>
                    </div>

                    <fieldset className="form-group mt-5">
                        <label>Prescription Creation Date</label>
                        <input style={{ color: "purple" }} className="form-control" type="text" placeholder="Creation Date" value={moment(new Date(this.state.prescription.prescriptionCreationDate)).format('hh:mm,  MMMM Do YYYY') || ''} onChange={this.handleChange} disabled={true} />
                    </fieldset>


                    {this.state.prescription.prescriptionFulfilmentDate > 0 && <fieldset className="form-group mt-5">
                        <label>Prescription Fulfillment Date</label>
                        <input style={{ color: "purple" }} className="form-control" type="text" placeholder="Creation Date" value={moment(new Date(this.state.prescription.prescriptionFulfilmentDate)).format('hh:mm,  MMMM Do YYYY') || ''} onChange={this.handleChange} disabled={true} />
                    </fieldset>}

                    <fieldset className="form-group mt-5">
                        <label>Patient Message to pharmacy</label>
                        <input style={{ color: "purple" }} className="form-control" type="text" placeholder="Patient Message To Pharmacy" value={this.state.prescription.patientMessage || ''} onChange={this.handleChange} disabled={true} />
                    </fieldset>

                    <fieldset className="form-group mt-5">
                        <label>Doctor/prescriber</label>
                        <input style={{ color: "purple" }} className="form-control" type="text" placeholder="Doctor" value={this.state.prescription.doctor || ''} onChange={this.handleChange} disabled={isDisabledEditing} />
                    </fieldset>


                    {this.state.prescriptionLineItems.map((lineItem, index) => (

                        <div key={lineItem}>
                            <div className="row mt-5">
                                <fieldset className="col-8">
                                    <label>Medication {index + 1}</label>

                                    <select className="form-control" onChange={this.handleLineItemChange}>
                                        {/* {this.state.availableMedicine.map((option, index) =>
                                            <option key={index} value={this.state.availableMedicine[index]}>{option.barcode}</option>
                                        )} */}

                                    </select>
                                    {/* <input style={{ color: "purple", fontWeight: "normal" }} className="form-control" type="text" placeholder="Patient First Name here" value={lineItem.lineItemMedicine.tradeName || ''} onChange={this.handleChange} disabled={isDisabledEditing} /> */}
                                </fieldset>

                                <fieldset className="col-4">
                                    <label>Quantity</label>
                                    <input style={{ color: "purple" }} className="form-control" type="text" placeholder="Patient Last Name here" value={lineItem.prescriptionLineItemQty || 0} onChange={this.handleChange} disabled={isDisabledEditing} />
                                </fieldset>
                            </div>

                            <fieldset className="form-group mt-3">
                                <label>Line Item Instructions</label>
                                <input style={{ color: "purple" }} className="form-control" type="text" placeholder="Patient Message To Pharmacy" defaultValue={lineItem.prescriptionLineItemInstructions || ''} onChange={this.handleChange} disabled={isDisabledEditing} />
                            </fieldset>
                        </div>
                    ))}

                    <button className="btn-primary" onClick={() => this.state.prescriptionLineItems.push('')}>Add a line Item</button>


                    <pre>{JSON.stringify(this.state, null, 2)}</pre>
                </div>

                <div className="col-4">
                    <img className="prescription-picture" src={this.state.prescription.prescriptionImageURI || "/images/sample-question-mark.png"} alt="prescription image" />
                </div>
            </div>

        </div >

    }

    addPrescriptionLineItem() {
        let updatedPrescriptionLineItemArray;
    }
}  