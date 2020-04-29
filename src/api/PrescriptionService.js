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
  fetchisPrescriptionEditable() {
    return true;
  }


  fetchAllAvailableMedicine() {
    return Axios.get(URL + `/pharmacy/getAvailableMedicine`);
  }


  // updatePrescriptionWithoutLineItems(Prescription){

  // }

  // update PrescriptionLineItems(lineItemArr){

  // }
}


export default new PrescriptionService();
