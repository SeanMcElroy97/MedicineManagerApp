import React, { Component } from "react";
import MedicineService from "../../api/MedicineService.js";
import SearchIcon from "../../../node_modules/@material-ui/icons/Search";
import { Card, CardContent, Typography, Grid } from '@material-ui/core';
import CountUp from 'react-countup';


export default class MedicineStockList extends Component {
  //this method responds when file has been dropped

  constructor(props) {
    super(props);
    this.state = {
      stockDisplayed: [],
      allStock: [],
      originalAllStock: [],
      currentStock: [],
      endOfLifeStock: [],
      isStockDisabled: false
    };

    this.refreshMedicineStockList = this.refreshMedicineStockList.bind(this);
    this.filterStockList = this.filterStockList.bind(this);
    this.getAllCurrentMedicine = this.getAllCurrentMedicine.bind(this)
    this.handleQtyChange = this.handleQtyChange.bind(this)

    this.sendUpdatedStockToPost = this.sendUpdatedStockToPost.bind(this)
  }


  componentDidMount() {
    this.refreshMedicineStockList();
  }

  refreshMedicineStockList() {
    MedicineService.fetchPharmacyStock().then(response => {
      this.setState({ allStock: response.data, stockDisplayed: response.data, originalAllStock: response.data })
      //console.log(response)
      this.getAllCurrentMedicine(response.data)
      document.getElementById("search-input").value = "";
    })
      .catch(() => alert('Could not fetch Stock'))

  }



  getAllCurrentMedicine(arrayOfAllStock) {
    let currentMedicine = []
    let endOfLifeStock = []

    //console.log('dude')

    for (let i = 0; i < arrayOfAllStock.length; i++) {

      if (arrayOfAllStock[i].itemStockMedicine.medicineStatus.toLowerCase() == "current") {
        currentMedicine.push(arrayOfAllStock[i])
        //console.log('hey')
      } else {
        endOfLifeStock.push(arrayOfAllStock[i])
        // //console.log('ho')
      }
    }

    this.setState({ currentStock: currentMedicine, endOfLifeStock: endOfLifeStock })

  }


  render() {
    return (
      <div className="container">
        <h1>Medicine Stock</h1>


        <div className="container">
          <Grid container spacing={3} justify="center" >
            <Grid item component={Card} xs={12} md={3} className={"covid-card-recovered"}>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>Current  Items</Typography>
                <Typography variant="h5">
                  <CountUp start={0} end={this.state.currentStock.length} duration={2.5} separator="," />
                </Typography>
                <Typography variant="body2">Medicine Items</Typography>
              </CardContent>
            </Grid>
            <Grid item component={Card} xs={12} md={3} className={"covid-card-confirmed"}>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>All Medicine Items</Typography>
                <Typography variant="h5">
                  <CountUp start={0} end={this.state.allStock.length} duration={2.5} separator="," />
                </Typography>
                <Typography variant="body2">Medicine Items</Typography>
              </CardContent>
            </Grid>
            <Grid item component={Card} xs={12} md={3} className={"covid-card-deaths"}>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>End of Life Items</Typography>
                <Typography variant="h5">
                  <CountUp start={0} end={this.state.endOfLifeStock.length} duration={2.5} separator="," />
                </Typography>
                <Typography variant="body2">Medicine Items</Typography>
              </CardContent>
            </Grid>
          </Grid>

        </div>

        <div className="container">
          <div align="right">
            <SearchIcon />
            <input id="search-input" type="text" onChange={this.filterStockList} placeholder="Enter Med tradename" />
          </div>
        </div>
        <div className="mt-5">
          {JSON.stringify(this.state.allStock) != JSON.stringify(this.state.originalAllStock) && <input type="button" className='center_btn btn btn-primary' color="inherit" onClick={this.sendUpdatedStockToPost} value="Update Stock" />}
          <table className="table table-bordered border- table-hover">
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

                {this.state.stockDisplayed.map((stockItem, index) => (
                  <tr key={stockItem.itemStockLevelID} style={stockItem.itemStockMedicine.medicineStatus.toLowerCase() == "end of life" ? { background: "lightgrey" } : {}}>
                    <td onClick={() => this.props.history.push(`/medicine/${stockItem.itemStockMedicine.barcode}`)}>{stockItem.itemStockMedicine.tradeName}</td>
                    <td>{stockItem.itemStockMedicine.ipuCategory}</td>
                    <td>{stockItem.itemStockMedicine.barcode}</td>
                    <td>{stockItem.itemStockMedicine.medicineStatus}</td>
                    <td><input maxLength="5" size="5" value={stockItem.quantity} disabled={this.state.isStockDisabled} onChange={(e) => this.handleQtyChange(stockItem.itemStockLevelID, e)} /></td>
                  </tr>
                ))}
              </tbody>
            )}
          </table>
        </div>

      </div >
    );
  }

  handleQtyChange(id, e) {

    //console.log('id : ' + id)
    // console.log('value : ' + e.target.value)

    const stockCopy = Object.assign([], this.state.allStock)
    const displayedStockCopy = Object.assign([], this.state.stockDisplayed)
    // const index = this.state.stockDisplayed.findIndex((item) => {
    //   return item.itemStockLevelID === id
    // });

    //const index = stockCopy.findIndex(stockItemX => stockItemX.itemStockLevelID === id)

    const index = displayedStockCopy.findIndex(stockItemX => stockItemX.itemStockLevelID === id)

    // for(let i =0; i<)
    ////console.log('index ' + index)
    const stockItem = Object.assign({}, this.state.stockDisplayed[index])
    stockItem.quantity = parseInt(e.target.value) || 0

    //console.log(stockItem.quantity)

    // //console.log(stockItem)

    for (let i = 0; i < stockCopy.length; i++) {
      if (i === index) {
        stockCopy[i] = stockItem
        break;
      }
    }

    for (let i = 0; i < displayedStockCopy.length; i++) {
      if (i === index) {
        displayedStockCopy[i] = stockItem
        break;
      }
    }

    //console.log(stockCopy)

    this.setState({ allStock: stockCopy, stockDisplayed: displayedStockCopy });
  }


  filterStockList(event) {
    let typedString = event.target.value.trim();
    // //console.log(typedString);
    // //console.log(this.state.allStock);

    let filteredArray = this.state.allStock.filter(value =>
      value.itemStockMedicine.tradeName.toLowerCase().includes(typedString.toLowerCase())
    );

    // //console.log(filteredArray);

    if (typedString.length == 0) {
      this.setState({ stockDisplayed: this.state.allStock, isStockDisabled: false });
    } else {
      this.setState({ stockDisplayed: filteredArray, isStockDisabled: false });
    }
  }



  sendUpdatedStockToPost() {

    let original = this.state.originalAllStock;
    let current = this.state.allStock
    // let updatedStock = []

    function comparer(otherArray) {
      return function (current) {
        return otherArray.filter(function (other) {
          return other.quantity === current.quantity
        }).length == 0;
      }
    }

    var stockToUpdate = current.filter(comparer(original));
    //var onlyInB = original.filter(comparer(current));
    //let diff = onlyInA.concat(onlyInB);

    stockToUpdate.forEach(function (x) { delete x.itemStockMedicine });

    //console.log(stockToUpdate);

    MedicineService.pharmacyUpdateStockItemList(stockToUpdate).then(this.refreshMedicineStockList)

  }
}


