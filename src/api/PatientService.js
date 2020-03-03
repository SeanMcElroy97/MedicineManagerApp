import { URL } from "../Constants";
import Axios from "axios";

class PatientService {
  executeTest() {
    //returns a PromisObj
    return Axios.get(
      URL +
        "/users/" +
        sessionStorage.getItem("authenticatedUser") +
        "/patient/test"
    ).then(response => console.log(response));
    //   .catch(alert("didnt work m8"));
  }

  addNewPatient(patientObj) {
    return Axios.post(
      URL +
        "/users/" +
        sessionStorage.getItem("authenticatedUser") +
        "/patient",
      patientObj
    ).then(response => console.log(response));
  }

  retrieveAllpatients() {
    return Axios.get(
      URL +
        "/users/" +
        sessionStorage.getItem("authenticatedUser") +
        "/patient/all"
    );
  }

  retrievePatientByID(id) {
    return Axios.get(
      URL +
        "/users/" +
        sessionStorage.getItem("authenticatedUser") +
        "/patient/" +
        id
    );
  }

  updatePatient(patient) {
    return Axios.put(
      URL +
        "/users/" +
        sessionStorage.getItem("authenticatedUser") +
        "/patient/" +
        patient.patientID,
      patient
    );
  }
}

export default new PatientService();
