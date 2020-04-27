import React, { Component } from "react";
import MedicineService from "../../api/MedicineService.js";


export default class MedicineStockList extends Component {
  //this method responds when file has been dropped

  constructor(props) {
    super(props);
    this.state = {
      stockDisplayed: [],
      allStock: []
    };

    this.refreshMedicineStockList = this.refreshMedicineStockList.bind(this);
    // this.filterMedicineList = this.filterMedicineList.bind(this);
  }

  // filterMedicineList(event) {
  //   let typedString = event.target.value.trim();
  //   console.log(typedString);
  //   console.log(this.state.medicines);

  //   let filteredArray = this.state.allMedicine.filter(value =>
  //     value.tradeName.toLowerCase().includes(typedString.toLowerCase())
  //   );

  //   console.log(filteredArray);

  //   if (typedString.length == 0) {
  //     this.setState({ medicines: this.state.allMedicine });
  //   } else {
  //     this.setState({ medicines: filteredArray });
  //   }
  // }

  componentDidMount() {
    this.refreshMedicineStockList();
  }

  refreshMedicineStockList() {
    MedicineService.fetchPharmacyStock().then(response => {
      this.setState({ allStock: response.data, stockDisplayed: response.data })
      console.log(response)
    })
      .catch(() => alert('Could not fetch Stock'))
  }


  render() {
    return (
      <div className="container">
        <h1>Medicine Stock</h1>


        <table className="table table-bordered border- table-hover mt-5">
          <thead>
            <tr className="bg-success text-white">
              <th>Trade Name</th>
              <th>IPU Category</th>
              <th>Barcode</th>
              <th>Status</th>
              <th>Quantity</th>
            </tr>
          </thead>
          {this.state.stockDisplayed.length >= 1 && (
            <tbody>

              {this.state.stockDisplayed.map(stockItem => (
                <tr key={stockItem.itemStockLevelID} onClick={() => this.props.history.push(`/medicine/${stockItem.itemStockMedicine.barcode}`)}>
                  <td>{stockItem.itemStockMedicine.tradeName}</td>
                  <td>{stockItem.itemStockMedicine.ipuCategory}</td>
                  <td>{stockItem.itemStockMedicine.barcode}</td>
                  <td>{stockItem.itemStockMedicine.medicineStatus}</td>
                  <td>{stockItem.quantity}</td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div >
    );
  }
}


