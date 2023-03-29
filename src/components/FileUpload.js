import React, { useState } from "react";
import * as XLSX from "xlsx";
const FileUpload = () => {

    const [error, setError] = useState(false);
    const [uploadData, setUploadData] = useState([]);

  const handleFileSelection = async (event) => {
    const file = event.target.files[0];
    const data = await file.arrayBuffer();
    const workbook = XLSX.read(data);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const excelData = XLSX.utils.sheet_to_json(worksheet);
      console.log("obj data", excelData);
      const isRightFormat =
      excelData.length !== 0
        ? excelData.every((data) =>
            Object.keys(data).every((title) =>
              [
                "Brand",
                "Model",
                "IMEI",
                "RAM", "ROM",
                "Device_Condition",
                "Purchased_From",
                "Purchased_From",
                "Contact_No",
                "Purchase_Cost",
                "Purchase_Date",
                "Sold_To",
                "Sold_To",
                "Contact_No",
                "Sold_Price",
                "Sold_Date",
                "Profit",
              ].includes(title)
            )
          )
              : false;
      
      if (isRightFormat) {
          setUploadData(excelData)
        setError(false)
      }
      else {
          setError(true)
      }
    };
    
    const downloadTemplate = () => {
        const data = [{
            Brand: undefined,
            Model: undefined,
            IMEI: undefined,
            RAM: undefined, ROM: undefined,
            Device_Condition: undefined,
            Purchased_From: undefined,
            Purchased_From: undefined,
            Contact_No: undefined,
            Purchase_Cost: undefined,
            Purchase_Date: undefined,
            Sold_To: undefined,
            Sold_To: undefined,
            Contact_No: undefined,
            Sold_Price: undefined,
            Sold_Date: undefined,
            Profit:undefined
        }]
        let workbook = XLSX.utils.book_new();
        let worksheet = XLSX.utils.json_to_sheet(data);
        XLSX.utils.book_append_sheet(workbook, worksheet, "sheet");
        XLSX.writeFile(workbook, "bulk_upload_template.xlsx");
    }

    const handleUpload = () => {
        
    }
  return (
    <>
      <h2>Bulk Upload</h2>
      <label htmlFor="fileSelect">Select File:</label>
      <div>
        <input
          id="fileSelect"
          type="file"
          accept=".xlsx, .xls, .csv"
          onChange={handleFileSelection}
              />
          </div>
          {error && <div className="text-danger">Invalid File</div>}
          <button onClick={handleUpload} disabled={error || uploadData.length==0} >
              Upload
          </button>
          <button onClick={downloadTemplate} >
              Download Template
          </button>
    </>
  );
};

export default FileUpload;
