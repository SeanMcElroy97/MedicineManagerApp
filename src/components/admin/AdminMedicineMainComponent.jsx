import React, { Component } from "react";
import Dropzone from "react-dropzone";
import MedicineService from "../../api/MedicineService.js";
import SearchIcon from "../../../node_modules/@material-ui/icons/Search";

export default class AdminMedicineMainComponent extends Component {
  //this method responds when file has been dropped

  constructor(props) {
    super(props);
    this.state = {
      medicinesDisplayed: [],
      allMedicine: []
    };

    this.refreshMedicineList = this.refreshMedicineList.bind(this);
    this.filterMedicineList = this.filterMedicineList.bind(this);
  }

  // Searching the medicine list
  filterMedicineList(event) {
    let typedString = event.target.value.trim();
    console.log(typedString);
    console.log(this.state.medicinesDisplayed);

    let filteredArray = this.state.allMedicine.filter(value =>
      value.tradeName.toLowerCase().includes(typedString.toLowerCase())
    );

    console.log(filteredArray);

    if (typedString.length == 0) {
      this.setState({ medicinesDisplayed: this.state.allMedicine });
    } else {
      this.setState({ medicinesDisplayed: filteredArray });
    }
  }

  componentDidMount() {
    this.refreshMedicineList();
  }

  //Call api
  refreshMedicineList() {
    MedicineService.adminRetrieveAllMedicines().then(response =>
      this.setState({
        medicinesDisplayed
          : response.data, allMedicine: response.data
      })

    ).then(response => console.log(response))
      .catch(() => alert('Could not retrieve Medicine data'));
  }

  handleOnDrop = (files, rejectedFiles) => {
    console.log(files);
    console.log("rejected files are", rejectedFiles);

    if (rejectedFiles && rejectedFiles.length > 0) {
      const currentRejectFile = rejectedFiles[0];
      const currentRejectFileType = currentRejectFile.type;

      if (currentRejectFileType !== ".csv") {
        alert("File must be type csv");
      }
    }

    if (files && files.length > 0) {
      const currentProductFile = files[0];
      const csvReader = new FileReader();
      csvReader.readAsText(currentProductFile);

      csvReader.onload = csvFile => {
        this.parseCSVtoJSON(csvFile);
      };
    }
  };

  parseCSVtoJSON = csvFileobj => {
    // console.log(JSON.stringify(textInCSV.target.result));
    let stringCSV = csvFileobj.target.result;

    //59 words per row. comma seperated
    let arry = this.CSVToArray(stringCSV);
    //console.log(arry);
    let arrayOfMedicinearrys = [];
    for (let i = 1; i < arry.length - 1; i++) {
      arrayOfMedicinearrys.push(arry[i]);
    }


    let arrayOfMedObjs = [];

    for (let i = 0; i < arrayOfMedicinearrys.length - 1; i++) {
      //Some may be parsed as Numbers
      let medObj = {
        ipuCategory: parseInt(arrayOfMedicinearrys[i][0]),
        barcode: arrayOfMedicinearrys[i][2],
        gmsNumber: arrayOfMedicinearrys[i][3].length < 1 ? null : parseInt(arrayOfMedicinearrys[i][3]),
        tradeName: arrayOfMedicinearrys[i][4],
        packSize: arrayOfMedicinearrys[i][5],
        manufacturer: arrayOfMedicinearrys[i][8],
        agent: arrayOfMedicinearrys[i][9],
        pc: arrayOfMedicinearrys[i][15],
        tradePrice: Number(arrayOfMedicinearrys[i][17]),
        genericName: arrayOfMedicinearrys[i][18],
        warnings: arrayOfMedicinearrys[i][20],
        ingredientList1: arrayOfMedicinearrys[i][21],
        atc1: arrayOfMedicinearrys[i][23],
        counsel: arrayOfMedicinearrys[i][26],
        strength: arrayOfMedicinearrys[i][27],
        forms: arrayOfMedicinearrys[i][28],

      };

      arrayOfMedObjs.push(medObj);
    }

    this.updateMedItemList(arrayOfMedObjs);
  };

  updateMedItemList = medList => {

    console.log(medList)
    MedicineService.adminPOSTMedList(medList)
      .then(this.refreshMedicineList)
      .catch(() => alert("Couldnt update product file"));

    // console.log(medList)
  };


  CSVToArray = strData => {
    //set the delimeter/seperator to a comma
    let strDelimiter = ",";

    // Create a regular expression to parse the CSV values.
    var objPattern = new RegExp(
      // Delimiters.
      "(\\" +
      strDelimiter +
      "|\\r?\\n|\\r|^)" +
      // Quoted fields.
      '(?:"([^"]*(?:""[^"]*)*)"|' +
      // Standard fields.
      '([^"\\' +
      strDelimiter +
      "\\r\\n]*))",
      "gi"
    );

    // Create an array to hold medicine data. Give the array
    // a default empty first row.
    var arrData = [[]];

    // Create an array to hold individual pattern
    // Different options are the delimeters, quoted values, unquoted values.
    var arrMatches = null;

    // Keep going while there are matches
    while ((arrMatches = objPattern.exec(strData))) {
      // Get the delimiter that was found.
      var strMatchedDelimiter = arrMatches[1];

      // Check to see if the given delimiter has a length
      // (is not the start of string) and if it matches
      // field delimiter. If not, then we know
      // that this delimiter is a row delimiter.
      if (strMatchedDelimiter.length && strMatchedDelimiter !== strDelimiter) {
        // Reached a new row of data,
        // add a new empty row to array.
        arrData.push([]);
      }

      var strMatchedValue;

      // delimiter stored,
      // let's check to see which kind of value we
      // captured (quoted or unquoted).
      if (arrMatches[2]) {
        // Quoted value, unescape any double quotes with new Regexp obj.
        strMatchedValue = arrMatches[2].replace(new RegExp('""', "g"), '"');
      } else {
        // Non-quoted value.
        strMatchedValue = arrMatches[3];
      }

      // Med-data value(string) gets added to one of the inner arrays. aka a medicine-row array
      arrData[arrData.length - 1].push(strMatchedValue);
    }

    // Return the Array of row-arrays
    return arrData;
  };




  // View 
  render() {
    return (
      <div className="container">
        <h1>Medicine List</h1>
        {this.state.allMedicine.length < 1 ? <h4>Drag 'n' drop a Product file here, or click to select file.
                Files must be '.csv' format</h4> : <h4>Drop product file to update Medicine</h4>}

        <div className="container"
          style={{
            border: "3px",
            borderStyle: "dashed",
            borderColor: "#28a745",
            padding: "1em",
            maxWidth: "400px"

          }}
        >
          <Dropzone onDrop={this.handleOnDrop} multiple={false} accept=".csv">
            {({ getRootProps, getInputProps }) => (
              <div {...getRootProps()}>
                <input {...getInputProps()} />

                <img src='/images/csv_logo.png' height="120" />

              </div>
            )}
          </Dropzone>
        </div>
        {/* <h1>Table here of current medicine data list</h1> */}


        <div className="container">
          <div className="container">
            <div align="right">
              <SearchIcon />
              <input id="search-input" type="text" onChange={this.filterMedicineList} placeholder="Enter Med tradename" />
            </div>
          </div>


          {this.state.medicinesDisplayed
            .length >= 1 && (
              <table className="table table-bordered border- table-hover">
                <thead>
                  <tr className="bg-success text-white">
                    <th>Trade Name</th>
                    <th>IPU Category</th>
                    <th>Barcode</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.medicinesDisplayed
                    .map(medicine => (
                      <tr
                        className={"tr:hover"}
                        key={medicine.barcode}
                        onClick={() => this.props.history.push(`/medicine/${medicine.barcode}`)}
                        style={medicine.medicineStatus.toLowerCase().replace(" ", "") == "endoflife" ? { background: "lightgrey" } : {}}
                      // onMouseEnter={() => { style = {{ background: "blue" }} }}
                      >
                        <td>{medicine.tradeName}</td>
                        <td>{medicine.ipuCategory}</td>
                        <td>{medicine.barcode}</td>
                        <td>{medicine.medicineStatus}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            )}
        </div>
      </div >
    );
  }
}


