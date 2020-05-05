import { URL, URLwithID } from "../Constants";
import Axios from "axios";

export const JWT_SESSION_TOKEN = 'Bearer '

class AuthenticationService {

  constructor() {
    Axios.interceptors.request.use(
      (config) => {
        console.log('in axios request.use')
        if (this.isUserLoggedIn() || this.isAdminLoggedIn()) {
          const tokeny = sessionStorage.getItem('jwt');
          config.headers.authorization = tokeny
        }
        return config
      }
    )
  }

  registerSuccessfulLogin(token, email) {
    sessionStorage.setItem("authenticatedUser", email);
    sessionStorage.setItem('jwt', 'Bearer ' + token)
  }

  registerSuccessfulAdminLogin(token, adminUsername) {
    sessionStorage.setItem("authenticatedAdmin", adminUsername);
    sessionStorage.setItem('jwt', 'Bearer ' + token)
  }



  isAdminLoggedIn() {
    let user = sessionStorage.getItem("authenticatedAdmin");
    if (user === null) return false;
    return true;
  }



  logoutUser() {
    sessionStorage.removeItem("authenticatedUser");
    sessionStorage.removeItem("authenticatedAdmin");
    sessionStorage.removeItem("jwt");
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem("authenticatedUser");
    if (user === null) return false;
    return true;
  }

  newPharmacyPost(newPharmacy) {
    return Axios.post(URL + "/createNewPharmacy", newPharmacy)
  }

  //Login
  pharmacyLogin(email, password) {
    return Axios.post(URL + "/authenticate", { email: email, password: password });
  }
}

//export an instance of Authentication helper classes
export default new AuthenticationService();
