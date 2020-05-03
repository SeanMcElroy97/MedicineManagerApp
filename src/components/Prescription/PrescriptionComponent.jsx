import PrescriptionService from '../../api/PrescriptionService';
import React from 'react'

import { Formik } from "formik";
import { TextField, Button } from "@material-ui/core";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

import moment from 'moment';

export default class PrescriptionComponent extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            prescriptionID: this.props.match.params.prescriptionID,
            prescription: {},
            prescriptionLineItems: [],
            availableMedicine: [],
            disableEditing: false
        }
        this.fetchLineItems = this.fetchLineItems.bind(this)
        this.fetchAllAvailableMedicine = this.fetchAllAvailableMedicine.bind(this)

        //Line Item//
        this.addPrescriptionLineItem = this.addPrescriptionLineItem.bind(this)
        this.handleLineItemQtyChange = this.handleLineItemQtyChange.bind(this)
        this.handleLineItemInstructionsChange = this.handleLineItemInstructionsChange.bind(this)
        this.handleMedicineChange = this.handleMedicineChange.bind(this)
        //Line Item//

        this.handleStatusChange = this.handleStatusChange.bind(this)
        this.handleDoctorChange = this.handleDoctorChange.bind(this)



        this.updatePrescriptionBtnHit = this.updatePrescriptionBtnHit.bind(this)
    }

    componentDidMount() {
        PrescriptionService.fetchPrescriptionById(this.state.prescriptionID)
            .then(response => {
                console.log(response.data)
                this.setState({ prescription: response.data })

                this.fetchLineItems()
            }).then(
                PrescriptionService.fetchisPrescriptionEditable(this.props.match.params.prescriptionID).then(response => this.setState({ disableEditing: !response.data }))
            )
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
        PrescriptionService.fetchAllAvailableMedicine()
            .then(response => {
                console.log('medicines available below')
                console.log(response)
                this.setState({ availableMedicine: response.data })
            })
    }



    render() {






        return <div className="container">

            <div className="row">


                <div className="col-8">

                    <fieldset className="form-group mt-5">
                        <label>Dispensing Pharmacy</label>
                        <input style={{ color: "purple" }} className="form-control" type="text" placeholder="Dispensing pharmacy" value={this.state.prescription.pharmacyName || ''} disabled={true} />
                    </fieldset>

                    <div className="row mt-5">
                        <fieldset className="col" onClick={() => this.props.history.push(`/patients/${this.state.prescription.prescriptionPatient}`)}>
                            <label>Patient First Name</label>
                            <input style={{ color: "purple", fontWeight: "normal" }} className="form-control" type="text" placeholder="Patient First Name here" value={this.state.prescription.patientFirstName || ''} disabled={true} />
                        </fieldset>

                        <fieldset className="col" onClick={() => this.props.history.push(`/patients/${this.state.prescription.prescriptionPatient}`)}>
                            <label>Patient Last Name</label>
                            <input style={{ color: "purple" }} className="form-control" type="text" placeholder="Patient Last Name here" value={this.state.prescription.patientLastName || ''} disabled={true} />
                        </fieldset>
                    </div>

                    <fieldset className="form-group mt-5">
                        <label>Prescription Creation Date</label>
                        <input style={{ color: "purple" }} className="form-control" type="text" placeholder="Creation Date" value={moment(new Date(this.state.prescription.prescriptionCreationDate)).format('hh:mm,  MMMM Do YYYY') || ''} disabled={true} />
                    </fieldset>


                    {this.state.prescription.prescriptionFulfilmentDate > 0 && <fieldset className="form-group mt-5">
                        <label>Prescription Fulfillment Date</label>
                        <input style={{ color: "purple" }} className="form-control" type="text" placeholder="Creation Date" value={moment(new Date(this.state.prescription.prescriptionFulfilmentDate)).format('hh:mm,  MMMM Do YYYY') || ''} disabled={true} />
                    </fieldset>}

                    <fieldset className="form-group mt-5">
                        <label>Patient Message to pharmacy</label>
                        <input style={{ color: "purple" }} className="form-control" type="text" placeholder="Patient Message To Pharmacy" value={this.state.prescription.patientMessage || ''} disabled={true} />
                    </fieldset>

                    <fieldset className="form-group mt-5">
                        <label>Doctor/prescriber</label>
                        <input style={{ color: "purple" }} className="form-control" type="text" placeholder="Doctor" value={this.state.prescription.doctor || ''} onChange={this.handleDoctorChange} disabled={this.state.disableEditing} />
                    </fieldset>


                    {this.state.prescriptionLineItems.map((lineItem, index) => (

                        <div key={lineItem.prescriptionLineItemID}>

                            <label className="mt-5" style={{ fontWeight: 'bold' }}>LineItem {index + 1}</label>
                            <div className="row">
                                <fieldset className="col-8">
                                    <label>Medicine</label>
                                    <select value={lineItem.lineItemMedicineID} onChange={(e) => this.handleMedicineChange(index, e)} className="form-control" disabled={this.state.disableEditing}>
                                        {this.state.availableMedicine.map((medItem) => (
                                            <option key={medItem.medicineItemID} value={medItem.medicineItemID}> {medItem.tradeName} {medItem.medicineStatus.toLowerCase() === "end of life" && '  ' + '   (' + medItem.medicineStatus + ')'} </option>
                                        ))}

                                    </select>
                                </fieldset>

                                <fieldset className="col-4">
                                    <label>Quantity</label>
                                    <input style={{ color: "purple" }} className="form-control" type="text" placeholder="Patient Last Name here" value={lineItem.prescriptionLineItemQty} onChange={(e) => this.handleLineItemQtyChange(index, e)} disabled={this.state.disableEditing} />
                                </fieldset>
                            </div>

                            <fieldset className="form-group mt-3">
                                <label>Line Item Instructions</label>
                                <input style={{ color: "purple" }} className="form-control" type="text" placeholder="Patient Message To Pharmacy" value={lineItem.prescriptionLineItemInstructions || ''} onChange={(e) => this.handleLineItemInstructionsChange(index, e)} disabled={this.state.disableEditing} />
                            </fieldset>

                            <fieldset className="form-group">
                                <DeleteForeverIcon color="secondary" style={{ fontSize: 40 }} disabled={this.state.disableEditing} onClick={() => this.removeLineItem(index)} />
                            </fieldset>

                        </div>
                    ))}

                    <button className="btn btn-primary mt-5" disabled={this.state.disableEditing} onClick={this.addPrescriptionLineItem}>Add a line Item</button>

                    {/*  */}
                    {/*  */}
                    {/*  */}
                    {/*  */}
                    {/* Status   */}
                    <fieldset className="form-group mt-5">
                        <label>Prescription Status</label>
                        <select value={this.state.prescription.prescriptionStatus} className="form-control" onChange={this.handleStatusChange} disabled={this.state.disableEditing}>
                            <option style={{ color: "GoldenRod" }} value="submitted">Submitted</option>
                            <option style={{ color: "blue" }} value="being prepared">Being Prepared</option>
                            <option style={{ color: "green" }} value="ready">Ready for pickup</option>
                            <option style={{ color: "red" }} value="cancelled">Cancel</option>
                            <option value="fulfilled">Fulfilled</option>
                        </select>
                    </fieldset>

                    {this.state.disableEditing == false && <button className="btn btn-success mt-5" onClick={this.updatePrescriptionBtnHit} disabled={this.state.isEditingAllowed}>Update Prescription</button>}



                </div>

                <div className="col-4">
                    <img className="prescription-picture" src={this.state.prescription.prescriptionImageURI || "/images/sample-question-mark.png"} alt="prescription image" />
                </div>
            </div>

        </div >

    }

    handleDoctorChange(event) {
        console.log(event.target.value)
        let doctor = event.target.value

        //Object.assign({}, prescription)
        this.setState(prevState => {
            let prescription = Object.assign({}, prevState.prescription);
            prescription.doctor = doctor;
            return { prescription };
        })
    }

    handleStatusChange(event) {
        // console.log(event.target.value)
        let status = event.target.value

        //Object.assign({}, prescription)
        this.setState(prevState => {
            let prescription = Object.assign({}, prevState.prescription);
            prescription.prescriptionStatus = status;
            return { prescription };
        })
    }

    addPrescriptionLineItem() {
        let updatedPrescriptionLineItemArray = Object.assign([], this.state.prescriptionLineItems)

        //push with empty attributes
        updatedPrescriptionLineItemArray.push({ 'prescriptionLineItemInstructions': '', 'prescriptionLineItemQty': 0, 'prescriptionLineItemID': Math.random() * 1000 })

        this.setState({ prescriptionLineItems: updatedPrescriptionLineItemArray })
    }

    updatePrescriptionBtnHit() {


        let arrayOfLineItems = Object.assign([], this.state.prescriptionLineItems)
        let arrayToBeSent = Object.assign([])

        for (let i = 0; i < arrayOfLineItems.length; i++) {
            if (arrayOfLineItems[i].prescriptionLineItemQty < 1) {
                alert(' A line item cannot have zero quantity')
                return;
            }

            const LineItemToSend = Object.assign({ 'prescriptionLineItemInstructions': arrayOfLineItems[i].prescriptionLineItemInstructions, 'prescriptionLineItemQty': arrayOfLineItems[i].prescriptionLineItemQty, 'lineItemMedicineID': arrayOfLineItems[i].lineItemMedicineID })
            arrayToBeSent.push(LineItemToSend)
        }

        console.log(arrayToBeSent)

        PrescriptionService.updatePrescriptionLineItems(arrayToBeSent, this.state.prescriptionID).then(() => {


            //alert('update prescription method')
            let prescriptionObjToPost = {}
            prescriptionObjToPost.prescriptionID = this.state.prescription.prescriptionID
            prescriptionObjToPost.doctor = this.state.prescription.doctor || ''
            prescriptionObjToPost.prescriptionStatus = this.state.prescription.prescriptionStatus

            if (prescriptionObjToPost.prescriptionStatus.toLowerCase == "fulfilled") {
                prescriptionObjToPost.prescriptionFulfilmentDate = new Date().getTime()
            } else {
                prescriptionObjToPost.prescriptionFulfilmentDate = 0
            }
            // prescriptionObjToPost.prescriptionFulfilmentDate = this.state.prescriptionFulfilmentDate || 0


            PrescriptionService.updatePrescriptionWithoutLineItems(prescriptionObjToPost).then(() => { this.componentDidMount() })


        })
    }

    handleLineItemQtyChange(index, e) {
        //console.log('index ' + index + ', line item change ' + e.target.value)

        let updatedLineItems = Object.assign([], this.state.prescriptionLineItems)

        const targetLineItem = Object.assign([], this.state.prescriptionLineItems[index])

        // targetLineItem.lineItemMedicineID
        // targetLineItem.prescriptionLineItemQty

        targetLineItem.prescriptionLineItemQty = parseInt(e.target.value) || 0

        PrescriptionService.fetchMedicineStockAvailability(this.state.prescriptionLineItems[index].lineItemMedicineID, e.target.value)
            .then(response => {
                if (response.data == false) {
                    alert('not enough stock')
                    targetLineItem.prescriptionLineItemQty = 0
                }
            })


        // targetLineItem.prescriptionLineItemQty = test || 0


        // console.log(targetLineItem)

        // console.log(this.state.prescriptionLineItems[index].lineItemMedicineID)

        for (let i = 0; i < updatedLineItems.length; i++) {
            if (i === index) {
                updatedLineItems[i] = targetLineItem
                break;
            }
        }

        this.setState({ prescriptionLineItems: updatedLineItems })

    }

    handleLineItemInstructionsChange(index, e) {
        //console.log('index ' + index + ', line item change ' + e.target.value)

        let updatedLineItems = Object.assign([], this.state.prescriptionLineItems)

        const targetLineItem = Object.assign([], this.state.prescriptionLineItems[index])

        targetLineItem.prescriptionLineItemInstructions = e.target.value || ''

        // console.log(targetLineItem)

        for (let i = 0; i < updatedLineItems.length; i++) {
            if (i === index) {
                updatedLineItems[i] = targetLineItem
                break;
            }
        }

        this.setState({ prescriptionLineItems: updatedLineItems })

    }

    handleMedicineChange(index, e) {

        console.log('index line item ' + index + '  value ' + e.target.value)

        let updatedLineItems = Object.assign([], this.state.prescriptionLineItems)

        const targetLineItem = Object.assign([], this.state.prescriptionLineItems[index])

        targetLineItem.lineItemMedicineID = parseInt(e.target.value) || 1

        // console.log('target Medicine below')
        // console.log(targetLineItem)

        for (let i = 0; i < updatedLineItems.length; i++) {
            if (i === index) {
                updatedLineItems[i] = targetLineItem
                break;
            }
        }

        this.setState({ prescriptionLineItems: updatedLineItems })

    }

    removeLineItem(index) {
        let updatedLineItems = Object.assign([], this.state.prescriptionLineItems)

        // const targetLineItem = Object.assign([], this.state.prescriptionLineItems[index])


        // for (let i = 0; i < updatedLineItems.length; i++) {
        //     if (i === index) {
        //         updatedLineItems[i] = targetLineItem
        //         break;
        //     }
        // }

        updatedLineItems.splice(index, 1)

        this.setState({ prescriptionLineItems: updatedLineItems })

    }
}  