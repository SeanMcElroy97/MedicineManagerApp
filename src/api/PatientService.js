import { URL } from "../Constants";
import Axios from "axios";
import AuthenticationService from "../Authentication/AuthenticationService";

class PatientService {

  constructor() {
    // Axios.interceptors.request.use(
    //   (config) => {
    //     console.log('in axios request.use')
    //     if (AuthenticationService.isUserLoggedIn()) {
    //       console.log('user is logged in')
    //       const tokeny = sessionStorage.getItem('jwt');
    //       config.headers.authorization = tokeny
    //     }
    //     return config
    //   }
    // )
  }

  // isUserLoggedIn() {
  //   let user = sessionStorage.getItem('authenticatedUser');
  //   return (user === null) ? false : true
  // }

  fetchMyPatients() {
    return Axios.get(URL + '/pharmacy/getMyPatients')
  }

  fetchPatientById(patientID) {
    return Axios.get(URL + `/pharmacy/getPatientDetailsById/${patientID}`)
  }

  fetchPatientPrescriptions(patientID) {
    return Axios.get(URL + `/pharmacy/getPatientPrescriptions/${patientID}`)
  }
}

export default new PatientService();
