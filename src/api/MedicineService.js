import { URL, URLwithID } from "../Constants";
import Axios from "axios";

class MedicineService {
  executeTest() {
    //returns a PromisObj
    return Axios.get(URLwithID + "/medicine/testmed");
    //   .then(response => console.log(response))
    //   .catch(alert("didnt work m8"));
  }

  sendMedToRest(medObj) {
    return Axios.post(URLwithID + "/medicine/addMeds", medObj);
  }

  retrieveAllMedicines() {
    console.log(URLwithID);
    return Axios.get(URLwithID + "/medicine/all");
  }

  //retrieveMedbyID
  retrieveMedByID(medID) {
    //console.log(URLwithID);
    return Axios.get(URLwithID + "/medicine/" + medID);
  }
}

export default new MedicineService();
