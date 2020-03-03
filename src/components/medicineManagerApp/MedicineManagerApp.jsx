import React, { Component } from "react";

import LoginComponent from "../LoginComponent.jsx";
import HeaderComponent from "../HeaderComponent.jsx";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomeComponent from "../HomeComponent.jsx";
import UpdateProductFile from "../UpdateProductFile.jsx";
import PatientListComponent from "../Patients/PatientListComponent.jsx";
import ErrorComponent from "../ErrorComponent.jsx";
import PatientComponent from "../Patients/PatientComponent.jsx";

// import AuthenticationService from "../../Authentication/AuthenticationService.js";
import AuthenticatedRoute from "../../Authentication/AuthenticatedRoute.jsx";
import MedicineComponent from "../Medicine/MedicineComponent.jsx";

//Prescription imports
import prescriptionListComponent from "../Prescription/PrescriptionListComponent.jsx";
import PrescriptionComponent from "../Prescription/PrescriptionComponent.jsx";

export default class MedicineManagerApp extends Component {
  render() {
    return (
      <Router>
        <HeaderComponent />
        <Switch>
          <Route path="/" exact component={LoginComponent} />
          <Route path="/login" component={LoginComponent} />
          <AuthenticatedRoute path="/home" component={HomeComponent} />
          <AuthenticatedRoute path="/signout" component={LoginComponent} />

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

          <AuthenticatedRoute component={ErrorComponent} />
          <Route component={LoginComponent} />
        </Switch>
      </Router>
    );
  }
}
