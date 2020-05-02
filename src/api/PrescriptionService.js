import { URL } from "../Constants";
import Axios from "axios";

class PrescriptionService {

  fetchAllPrescriptions() {
    return Axios.get(URL + '/pharmacy/getMyPrescriptions')
  }

  //Retrieves the prescription
  fetchPrescriptionById(prescriptionID) {
    return Axios.get(URL + `/pharmacy/getPrescription/${prescriptionID}`)
  }

  fetchPrescriptionLineItemsById(prescriptionID) {
    return Axios.get(URL + `/pharmacy/getPrescriptionLineItems/${prescriptionID}`)
  }

  //Retrieves 
  fetchisPrescriptionEditable(prescriptionID) {
    return Axios.get(URL + `/pharmacy/prescriptioneditable/${prescriptionID}`)
  }


  fetchAllAvailableMedicine() {
    return Axios.get(URL + `/pharmacy/getAvailableMedicine`);
  }

  //Step 2
  updatePrescriptionWithoutLineItems(updatedPrescription) {
    return Axios.post(URL + `/pharmacy/updatePrescription`, updatedPrescription)
  }

  //Step 1
  // update PrescriptionLineItems(lineItemArr){

  // }
}


export default new PrescriptionService();
