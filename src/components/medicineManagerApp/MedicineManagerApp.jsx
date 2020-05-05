import React, { Component } from "react";

import HeaderComponent from "../HeaderComponent.jsx";

import LandingPageComponent from "../signingIn/LandingPageComponent.jsx";
import AboutComponent from "../AboutComponent.jsx";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomeComponent from "../HomeComponent.jsx";

import PatientListComponent from "../patients/PatientListComponent.jsx";
import ErrorComponent from "../ErrorComponent.jsx";
import PatientComponent from "../patients/PatientComponent.jsx";

// import AuthenticationService
import AuthenticatedRoute from "../../Authentication/AuthenticatedRoute.jsx";
import AdminAuthenticatedRoute from "../../Authentication/AdminAuthenticatedRoute.jsx";


//Admin Components
import AdminMedicineMainComponent from "../admin/AdminMedicineMainComponent.jsx";

//Medicine Imports
// import MedicineMainComponent from "../admin/AdminMedicineMainComponent.jsx";
import MedicineStockList from "../medicine/medicineStockList";
import MedicineItem from "../medicine/MedicineItem.jsx";

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

          {/* Admin Route */}
          <AdminAuthenticatedRoute
            path="/adminmedicinefile"
            exact
            component={AdminMedicineMainComponent}
          />

          <AuthenticatedRoute
            path="/medicineStockList"
            exact
            component={MedicineStockList}
          />

          <Route
            path="/medicine/:barcode"
            exact
            component={MedicineItem}
          />

          <AuthenticatedRoute
            path="/patients/:patientID"
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
            path="/prescriptions/:prescriptionID"
            exact
            component={PrescriptionComponent}
          />

          <AuthenticatedRoute
            path="/covid19"
            exact
            component={Covid19MainComponent}
          />

          <Route path="/about" exact component={AboutComponent} />

          <AuthenticatedRoute component={ErrorComponent} />
          <Route component={LandingPageComponent} />


        </Switch>
      </Router>
    );
  }
}
