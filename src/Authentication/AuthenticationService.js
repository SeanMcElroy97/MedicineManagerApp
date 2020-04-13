class AuthenticationService {
  registerSuccessfulLogin(username, password) {
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

  newUserRegister(pharmacyEmail, pharmacyPassword) {
    //Params
    //1.EndPoint to hit. 
    //2.Data to send. 
    //3.Allow API to set cookie
  }
}

//export an instance of Authentication helper classes
export default new AuthenticationService();
