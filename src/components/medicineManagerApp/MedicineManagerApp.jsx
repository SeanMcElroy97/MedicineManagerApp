import React, { Component } from "react";


import HeaderComponent from "../HeaderComponent.jsx";

import LandingPageComponent from "../signingIn/LandingPageComponent.jsx";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomeComponent from "../HomeComponent.jsx";
import UpdateProductFile from "../UpdateProductFile.jsx";
import PatientListComponent from "../patients/PatientListComponent.jsx";
import ErrorComponent from "../ErrorComponent.jsx";
import PatientComponent from "../patients/PatientComponent.jsx";

// import AuthenticationService from "../../Authentication/AuthenticationService.js";
import AuthenticatedRoute from "../../Authentication/AuthenticatedRoute.jsx";
import MedicineComponent from "../medicine/MedicineComponent.jsx";

//Prescription imports
import prescriptionListComponent from "../prescription/PrescriptionListComponent.jsx";
import PrescriptionComponent from "../prescription/PrescriptionComponent.jsx";


//Covid imports
import Covid19MainComponent from "../covid19/Covid19MainComponent.jsx";

export default class MedicineManagerApp extends Component {
  render() {
    return (
      <Router>
        <HeaderComponent />
        <Switch>
          <Route path="/" exact component={LandingPageComponent} />
          <Route path="/login" component={LandingPageComponent} />
          <AuthenticatedRoute path="/home" component={HomeComponent} />
          <AuthenticatedRoute path="/signout" component={LandingPageComponent} />

          <AuthenticatedRoute
            path="/medicine"
            exact
            component={UpdateProductFile}
          />

          <AuthenticatedRoute
            path="/medicine/:idBarcode"
            exact
            component={MedicineComponent}
          />

          <AuthenticatedRoute
            path="/patients/:id"
            component={PatientComponent}
          />
          <AuthenticatedRoute
            path="/patients"
            exact
            component={PatientListComponent}
          />

          <AuthenticatedRoute
            path="/prescriptions"
            exact
            component={prescriptionListComponent}
          />

          <AuthenticatedRoute
            path="/prescriptions/:id"
            exact
            component={PrescriptionComponent}
          />

          <AuthenticatedRoute
            path="/covid19"
            exact
            component={Covid19MainComponent}
          />

          <AuthenticatedRoute component={ErrorComponent} />
          <Route component={LandingPageComponent} />
        </Switch>
      </Router>
    );
  }
}
