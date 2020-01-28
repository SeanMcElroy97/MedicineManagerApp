import React, { Component } from "react";
import Dropzone from "react-dropzone";

class UpdateProductFile extends Component {
  //this method responds when file has been dropped
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

      csvReader.onload = csvText => {
        console.log(csvText.target.result);
        //Still need to figure out converting this into json
        //or pass this rubish to java and let it parse it
      };
    }
  };

  render() {
    return (
      <div>
        <h1>File dropper</h1>

        <Dropzone onDrop={this.handleOnDrop} multiple={false} accept=".csv">
          {({ getRootProps, getInputProps }) => (
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <p>
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
