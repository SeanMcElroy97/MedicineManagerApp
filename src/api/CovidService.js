import { URL, URLwithID } from "../Constants";
import Axios from "axios";

class CovidService {
  executeTest() {
    //returns a PromisObj
    return Axios.get(URLwithID + "/covid19/covyTest")
      .then(response => console.log(response))
      .catch(alert("couldnt get reach test"));
  }

  // retrieveAllCovidData() {
  //   console.log(URLwithID);
  //   return Axios.get(URLwithID + "/covid19/all");
  // }


}

export default new MedicineService();
