import React from "react";
import "./App.css";
import "./bootstrap.css";
import MedicineManagerApp from "./components/medicineManagerApp/MedicineManagerApp";

function App() {
  document.body.style = 'background: #fffafa';
  // document.body.style = 'background: #fffff0';


  return <MedicineManagerApp className="App" />;
}

export default App;
