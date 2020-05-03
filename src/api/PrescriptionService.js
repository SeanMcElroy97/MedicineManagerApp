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

  fetchMedicineStockAvailability(MedicineId, qtyToRemove) {
    return Axios.get(URL + `/pharmacy/CheckLineItemStock/${MedicineId}/${qtyToRemove}`)
  }
  //Step 1
  updatePrescriptionLineItems(lineItemArr, prescriptionID) {
    return Axios.post(URL + `/pharmacy/updatePrescriptionLineItems/${prescriptionID}`, lineItemArr)
  }
}


export default new PrescriptionService();
