import { URL } from "../Constants";
import Axios from "axios";

class PatientService {

  fetchMyPatients() {
    return Axios.get(URL + '/pharmacy/test')
  }
}

export default new PatientService();
