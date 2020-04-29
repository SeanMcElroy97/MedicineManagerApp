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
      currentStock: [],
      endOfLifeStock: []
    };

    this.refreshMedicineStockList = this.refreshMedicineStockList.bind(this);
    this.filterStockList = this.filterStockList.bind(this);
    this.getAllCurrentMedicine = this.getAllCurrentMedicine.bind(this)
  }


  componentDidMount() {
    this.refreshMedicineStockList();
  }

  refreshMedicineStockList() {
    MedicineService.fetchPharmacyStock().then(response => {
      this.setState({ allStock: response.data, stockDisplayed: response.data })
      console.log(response)
      this.getAllCurrentMedicine(response.data)
    })
      .catch(() => alert('Could not fetch Stock'))



  }

  getAllCurrentMedicine(arrayOfAllStock) {
    let currentMedicine = []
    let endOfLifeStock = []

    console.log('dude')

    for (let i = 0; i < arrayOfAllStock.length; i++) {

      if (arrayOfAllStock[i].itemStockMedicine.medicineStatus.toLowerCase() == "current") {
        currentMedicine.push(arrayOfAllStock[i])
        console.log('hey')
      } else {
        endOfLifeStock.push(arrayOfAllStock[i])
        // console.log('ho')
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
                <tr key={stockItem.itemStockLevelID} onClick={() => this.props.history.push(`/medicine/${stockItem.itemStockMedicine.barcode}`)} style={stockItem.itemStockMedicine.medicineStatus.toLowerCase().replace(" ", "") == "endoflife" ? { background: "lightgrey" } : {}}>
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


  filterStockList(event) {
    let typedString = event.target.value.trim();
    // console.log(typedString);
    // console.log(this.state.allStock);

    let filteredArray = this.state.allStock.filter(value =>
      value.itemStockMedicine.tradeName.toLowerCase().includes(typedString.toLowerCase())
    );

    // console.log(filteredArray);

    if (typedString.length == 0) {
      this.setState({ stockDisplayed: this.state.allStock });
    } else {
      this.setState({ stockDisplayed: filteredArray });
    }
  }
}


