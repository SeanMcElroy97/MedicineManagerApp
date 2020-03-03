import { URL } from "../Constants";
import Axios from "axios";

class PrescriptionService {
  executeTest() {
    //returns a PromisObj
    return Axios.get(
      URL +
      "/users/" +
      sessionStorage.getItem("authenticatedUser") +
      "/prescription/test"
    ).then(response => console.log(response));
  }

  // addAPrescription(prescription) {
  //   return Axios.post(
  //     URL +
  //       "/users/" +
  //       sessionStorage.getItem("authenticatedUser") +
  //       "/prescription/addy",
  //     prescription
  //   ).then(response => console.log(response));
  // }

  postAPrescription(prescription) {
    return Axios.post(
      URL +
      "/users/" +
      sessionStorage.getItem("authenticatedUser") +
      "/prescription/add",
      prescription
    ).then(response => console.log(response));
  }

  retrieveAllPrescriptions() {
    return Axios.get(
      URL +
      "/users/" +
      sessionStorage.getItem("authenticatedUser") +
      "/prescription/all"
    );
  }
}

export default new PrescriptionService();
