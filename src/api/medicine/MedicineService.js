import { URL } from "../../Constants";
import Axios from "axios";

class MedicineService {
  executeTest() {
    //returns a PromisObj
    return Axios.get(URL + "/medicine/testmed");
    //   .then(response => console.log(response))
    //   .catch(alert("didnt work m8"));
  }

  sendMedToRest(medObj) {
    return Axios.post(URL + "/medicine/addMeds", medObj);
  }
}

export default new MedicineService();
