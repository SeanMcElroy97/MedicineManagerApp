import React, { Component } from "react";
import Dropzone from "react-dropzone";
import MedicineService from "../api/medicine/MedicineService.js";

class UpdateProductFile extends Component {
  //this method responds when file has been dropped

  constructor(props) {
    super(props);
    this.state = {
      medicines: []
    };
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
        //console.log(JSON.stringify(csvText.target.result));
        //Still need to figure out converting this into json
        //or pass this rubish to java and let it parse it
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

    //var MedicineObject ={ }
    console.log(sessionStorage.getItem("authenticatedUser"));
    // console.log(arrayOfMedicinearrys[0]);
    // console.log(arrayOfMedicineItems);

    let arrayOfMedObjs = [];

    for (let i = 0; i < arrayOfMedicinearrys.length - 1; i++) {
      //Some may be parsed as Numbers
      let medObj = {
        category: parseInt(arrayOfMedicinearrys[i][0]),
        ipuEANCode: arrayOfMedicinearrys[i][1],
        barcode: arrayOfMedicinearrys[i][2],
        gmsNum:
          arrayOfMedicinearrys[i][3].length < 1
            ? null
            : parseInt(arrayOfMedicinearrys[i][3]),
        tradeNum: arrayOfMedicinearrys[i][4],
        packSize: arrayOfMedicinearrys[i][5],
        packSizeNumber: parseInt(arrayOfMedicinearrys[i][6]),
        packSizeUnits: arrayOfMedicinearrys[i][7],
        manufacturer: arrayOfMedicinearrys[i][8],
        agent: arrayOfMedicinearrys[i][9],
        reimbursementPrice: Number(arrayOfMedicinearrys[i][10]),
        retailPriceRecommended: Number(arrayOfMedicinearrys[i][11]),
        VAT: arrayOfMedicinearrys[i][12],
        vatChanges: arrayOfMedicinearrys[i][13],
        otherChange: arrayOfMedicinearrys[i][14],
        poisonClassification: arrayOfMedicinearrys[i][15],
        productAuthorization: arrayOfMedicinearrys[i][16],
        tradePrice: Number(arrayOfMedicinearrys[i][17]),
        genericName: arrayOfMedicinearrys[i][18],
        dateBlank: arrayOfMedicinearrys[i][19],
        warningCodesForLabels: arrayOfMedicinearrys[i][20],
        ingredientsListOne: arrayOfMedicinearrys[i][21],
        ingredientsListTwo: arrayOfMedicinearrys[i][22],
        ATCCode: arrayOfMedicinearrys[i][23],
        ATCCodetwo: arrayOfMedicinearrys[i][24],
        Dentist: arrayOfMedicinearrys[i][25],
        counsellingCodes: arrayOfMedicinearrys[i][26],
        strength: arrayOfMedicinearrys[i][27],
        formsOfDrug: arrayOfMedicinearrys[i][28],
        ingredientOne: arrayOfMedicinearrys[i][29],
        ingredientTwo: arrayOfMedicinearrys[i][30],
        ingredientThree: arrayOfMedicinearrys[i][31],
        ingredientFour: arrayOfMedicinearrys[i][32],
        ingredientFive: arrayOfMedicinearrys[i][33],
        ingredientSix: arrayOfMedicinearrys[i][34],
        ingredientSeven: arrayOfMedicinearrys[i][35],
        ingredientEight: arrayOfMedicinearrys[i][36],
        ingredientNine: arrayOfMedicinearrys[i][37],
        ingredientTen: arrayOfMedicinearrys[i][38],
        ingredAtcCodeOne: arrayOfMedicinearrys[i][39],
        ingredAtcCodeTwo: arrayOfMedicinearrys[i][40],
        ingredAtcCodeThree: arrayOfMedicinearrys[i][41],
        ingredAtcCodeFour: arrayOfMedicinearrys[i][42],
        ingredAtcCodeFive: arrayOfMedicinearrys[i][43],
        ingredAtcCodeSix: arrayOfMedicinearrys[i][44],
        ingredAtcCodeSeven: arrayOfMedicinearrys[i][45],
        ingredAtcCodeEight: arrayOfMedicinearrys[i][46],
        ingredAtcCodeNine: arrayOfMedicinearrys[i][47],
        ingredAtcCodeTen: arrayOfMedicinearrys[i][48],
        barcodeExtraOne: arrayOfMedicinearrys[i][49],
        barcodeExtraTwo: arrayOfMedicinearrys[i][50],
        barcodeExtraThree: arrayOfMedicinearrys[i][51],
        barcodeExtraFour: arrayOfMedicinearrys[i][52],
        barcodeExtraFive: arrayOfMedicinearrys[i][53],
        barcodeExtraSix: arrayOfMedicinearrys[i][54],
        gmsOne: arrayOfMedicinearrys[i][55],
        eposCat: arrayOfMedicinearrys[i][56],
        eposDept: arrayOfMedicinearrys[i][57]
      };

      arrayOfMedObjs.push(medObj);
    }

    this.setState({
      medicines: arrayOfMedObjs
    });
    // console.log(arrayOfMedObjs);
    console.log(this.state.medicines[0]);

    this.sendObjsToREST(this.state.medicines[0]);
  };

  sendObjsToREST = medObj => {
    MedicineService.sendMedToRest(medObj)
      .then(re => console.log(re))
      .catch(alert("oh well"));
  };

  //Takes in String and returns an array of arrays.
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

  render() {
    return (
      <div>
        <h1>File dropper</h1>

        <Dropzone onDrop={this.handleOnDrop} multiple={false} accept=".csv">
          {({ getRootProps, getInputProps }) => (
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <p
                style={{
                  border: "3px",
                  borderStyle: "solid",
                  borderColor: "#FF0000",
                  padding: "1em"
                }}
              >
                Drag 'n' drop a Product file here, or click to select file.
                Files must be '.csv' format
              </p>
            </div>
          )}
        </Dropzone>

        <h1>Table here of current medicine data list</h1>
      </div>
    );
  }
}

export default UpdateProductFile;
