import { URL, URLwithID } from "../Constants";
import Axios from "axios";

class AuthenticationService {
  registerSuccessfulLogin(username) {
    sessionStorage.setItem("authenticatedUser", username);
  }

  logoutUser() {
    sessionStorage.removeItem("authenticatedUser");
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
  pharmacyLogin() {

  }
}

//export an instance of Authentication helper classes
export default new AuthenticationService();
