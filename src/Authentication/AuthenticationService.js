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
    //Params
    //1.EndPoint to hit. 
    //2.Data to send. 
    //3.Allow API to set cookie

    Axios.post(URL + "/newPharm", newPharmacy)
      .then(this.registerSuccessfulLogin(newPharmacy.pharmacyEmail))
  }

  //Login
  pharmacyLogin() {

  }
}

//export an instance of Authentication helper classes
export default new AuthenticationService();
