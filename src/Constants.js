import AuthenticationService from "./Authentication/AuthenticationService";

export const URL = "http://localhost:8080";

export const URLwithID =
  URL + "/users/" + sessionStorage.getItem("authenticatedUser");
