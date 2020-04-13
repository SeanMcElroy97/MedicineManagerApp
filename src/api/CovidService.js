import { URL, URLwithID } from "../Constants";
import Axios from "axios";

class CovidService {
  executeTest() {
    //returns a PromisObj
    return Axios.get(URL + "/covid19/covyTest")
      .then(response => console.log(response))
      .catch(alert("couldnt get reach test"));
  }

  executeTest2 = async () => {
    try {
      const response = await Axios.get(URL + "/covid19/covyTest");
      return response;
    } catch (error) {

    }
  }

  retrieveGlobalTotals() {
    return Axios.get(URL + "/covid19/globalTotals");
  }


}

export default new CovidService();
