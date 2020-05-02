import { URL } from "../Constants";
import Axios from "axios";

class PatientService {

  fetchMyPatients() {
    return Axios.get(URL + '/pharmacy/getMyPatients')
  }

  fetchPatientById(patientID) {
    //return Axios.get()
  }

  fetchPatientPrescriptions(patientID) {
    return Axios.get(URL + `/pharmacy/getPatientPrescriptions/${patientID}`)
  }
}

export default new PatientService();
