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

  //Retrieves 
  fetchisPrescriptionEditable() {
    return true;
  }

}

export default new PrescriptionService();
