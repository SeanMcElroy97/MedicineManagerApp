import { URL } from "../Constants";
import Axios from "axios";

class MedicineService {
  executeTest() {
    //returns a PromisObj
    return Axios.get(URL + "/medicine/test");
    //   .then(response => console.log(response))
    //   .catch(alert("didnt work m8"));
  }

  adminPOSTMedList(medItemList) {
    return Axios.post(URL + "/admin/updateMedList", medItemList);
  }

  adminRetrieveAllMedicines() {
    //console.log(URLwithID);
    return Axios.get(URL + "/admin/retrieveAllMedItems");
  }


  pharmacyUpdateStockItemList(stockItemList) {
    console.log(stockItemList)
    return Axios.post(URL + "/pharmacy/updateMedicineStock", stockItemList);
  }







  //Pharmacy

  testPharmacyMethod() {
    return Axios.get(URL + '/pharmacy/test');
  }

  fetchPharmacyStock() {
    return Axios.get(URL + '/pharmacy/allStock');
  }

  fetchMedicineByBarcode(barcode) {
    return Axios.get(URL + "/pharmacy/medicine/" + barcode);
  }
}

export default new MedicineService();
