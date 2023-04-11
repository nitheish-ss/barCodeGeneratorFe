import React, { useState } from "react";
import { toast } from "react-toastify";
import * as XLSX from "xlsx";
import { uploadBulkDeviceData } from "../services/deviceService";
const FileUpload = () => {
  const [error, setError] = useState({
    is_error: false,
    message: "Invalid File",
  });
  const [devicesList, setDevicesList] = useState([]);

  const uploadBulkData = async () => {
    if (devicesList.length > 0) {
      const bulkData = devicesList.map((data) => {
        return {
          brand: data?.Brand,
          model: data?.Model,
          imei: data?.IMEI,
          ...(data?.RAM && { ram: data?.RAM }),
          ...(data?.ROM && { rom: data?.ROM }),
          ...(data?.ROM_GB_or_TB && {
            romUnit: data?.ROM_GB_or_TB.toUpperCase(),
          }),
          ...(data?.Device_Condition && {
            deviceCondition: data?.Device_Condition,
          }),
          ...(data?.Purchased_From && { purchasedFrom: data?.Purchased_From }),
          ...(data?.Purchased_From_Contact_No && {
            purchasedFromContactNo: data?.Purchased_From_Contact_No,
          }),
          ...(data?.Purchase_Cost && { purchaseCost: data?.Purchase_Cost }),
          ...(data?.Purchase_Date && {
            purchaseDate: new Date(data?.Purchase_Date),
          }),
          ...(data?.Sold_To && { soldTo: data?.Sold_To }),
          ...(data?.Sold_To_Contact_No && {
            soldToContactNo: data?.Sold_To_Contact_No,
          }),
          ...(data?.Sold_Price && { soldPrice: data?.Sold_Price }),
          ...(data?.Sold_Date && { soldDate: new Date(data?.Sold_Date) }),
          ...(data?.Purchase_Cost &&
            data?.Sold_Price && {
              profit: data?.Sold_Price - data?.Purchase_Cost,
            }),
        };
      });
      try {
        await uploadBulkDeviceData(bulkData);
        toast.success("Device List Uploaded Successfully");
      } catch (error) {
        toast.error(error?.response?.data?.error);
      }
    }
  };
  const checkFileIsCorrect = (excelData) => {
    const isRightFormat =
      excelData.length !== 0
        ? excelData.every((data) =>
            Object.keys(data).every((title) =>
              [
                "Brand",
                "Model",
                "IMEI",
                "RAM",
                "ROM",
                "ROM_GB_or_TB",
                "Device_Condition",
                "Purchased_From",
                "Purchased_From_Contact_No",
                "Purchase_Cost",
                "Purchase_Date",
                "Sold_To",
                "Sold_To_Contact_No",
                "Sold_Price",
                "Sold_Date",
              ].includes(title)
            )
          )
        : false;

    if (isRightFormat) {
      const exampleData = { removed: false, index: null };
      const uploadData = excelData.filter((data, index) => {
        if (data?.IMEI != 111111111111111) {
          return true;
        } else {
          exampleData.removed = true;
          exampleData.index = index;
          return false;
        }
      });
      console.log(uploadData.length);
      if (uploadData.length > 0) {
        for (let i = 0; i <= uploadData.length - 1; i++) {
          if (!uploadData[i]?.Brand) {
            setError({
              is_error: true,
              message: `Row number - ${
                exampleData.removed && exampleData.index <= i ? i + 3 : i + 2
              } not having brand`,
            });
            break;
          }
          if (!uploadData[i]?.Model) {
            setError({
              is_error: true,
              message: `Row number - ${
                exampleData.removed && exampleData.index <= i ? i + 3 : i + 2
              } not having model`,
            });
            break;
          }
          if (!uploadData[i]?.IMEI) {
            setError({
              is_error: true,
              message: `Row number - ${
                exampleData.removed && exampleData.index <= i ? i + 3 : i + 2
              } not having IMEI`,
            });
            break;
          }
          if (uploadData[i]?.IMEI.toString().length != 15) {
            setError({
              is_error: true,
              message: `Row number - ${
                exampleData.removed && exampleData.index <= i ? i + 3 : i + 2
              } IMEI is not valid`,
            });
            break;
          }
          if (uploadData[i]?.RAM < 0) {
            setError({
              is_error: true,
              message: `Row number - ${
                exampleData.removed && exampleData.index <= i ? i + 3 : i + 2
              }: RAM should be positive `,
            });
            break;
          }
          if (uploadData[i]?.ROM < 0) {
            setError({
              is_error: true,
              message: `Row number - ${
                exampleData.removed && exampleData.index <= i ? i + 3 : i + 2
              } : ROM should be positive`,
            });
            break;
          }
          if (
            uploadData[i]?.ROM_GB_or_TB &&
            uploadData[i]?.ROM_GB_or_TB.toLowerCase() != "gb" &&
            uploadData[i]?.ROM_GB_or_TB.toLowerCase() != "tb"
          ) {
            setError({
              is_error: true,
              message: `Row number - ${
                exampleData.removed && exampleData.index <= i ? i + 3 : i + 2
              } : ROM_GB_or_TB value should be GB or TB`,
            });
            break;
          }
          if (uploadData[i]?.Sold_Price < 0) {
            setError({
              is_error: true,
              message: `Row number - ${
                exampleData.removed && exampleData.index <= i ? i + 3 : i + 2
              } : Sold_Price should be positive`,
            });
            break;
          }
          if (uploadData[i]?.Purchase_Cost < 0) {
            setError({
              is_error: true,
              message: `Row number - ${
                exampleData.removed && exampleData.index <= i ? i + 3 : i + 2
              } : Purchase_Cost should be positive`,
            });
            break;
          }
          if (
            uploadData[i]?.Purchased_From_Contact_No &&
            !uploadData[i]?.Purchased_From_Contact_No.match(
              /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[56789]\d{9}$/
            )
          ) {
            setError({
              is_error: true,
              message: `Row number - ${
                exampleData.removed && exampleData.index <= i ? i + 3 : i + 2
              } : Purchased_From_Contact_No is not valid`,
            });
            break;
          }
          if (
            uploadData[i]?.Sold_To_Contact_No &&
            !uploadData[i]?.Sold_To_Contact_No.match(
              /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[56789]\d{9}$/
            )
          ) {
            setError({
              is_error: true,
              message: `Row number - ${
                exampleData.removed && exampleData.index <= i ? i + 3 : i + 2
              } : Sold_To_Contact_No is not valid`,
            });
            break;
          }
          if (
            uploadData[i]?.Purchase_Date &&
            isNaN(new Date(uploadData[i]?.Purchase_Date))
          ) {
            setError({
              is_error: true,
              message: `Row number - ${
                exampleData.removed && exampleData.index <= i ? i + 3 : i + 2
              } : Purchase_Date is not valid`,
            });
            break;
          }
          if (
            uploadData[i]?.Sold_Date &&
            isNaN(new Date(uploadData[i]?.Sold_Date))
          ) {
            setError({
              is_error: true,
              message: `Row number - ${
                exampleData.removed && exampleData.index <= i ? i + 3 : i + 2
              } : Sold_Date is not valid`,
            });
            break;
          }
        }
        if (!error.is_error) {
          setDevicesList(uploadData);
        }
      } else {
        setError({ is_error: true, message: "File rows cannot be empty" });
      }
    } else {
      setDevicesList([]);
      setError({ is_error: true, message: "Invalid File" });
    }
  };

  const handleFileSelection = async (event) => {
    const file = event.target.files[0];
    const data = await file.arrayBuffer();
    const workbook = XLSX.read(data);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const excelData = XLSX.utils.sheet_to_json(worksheet, {
      defval: "",
      raw: false,
      dateNF: 'dd"/"mm"/"yyyy',
    });
    checkFileIsCorrect(excelData);
  };

  const downloadTemplate = () => {
    const data = [
      {
        Brand: "Brand Name",
        Model: "Model Name",
        IMEI: 111111111111111,
        RAM: 6,
        ROM: 128,
        ROM_GB_or_TB: "GB",
        Device_Condition: "Write some lines about Device Condition",
        Purchased_From: "Name",
        Purchased_From_Contact_No: 9956471589,
        Purchase_Cost: 20000,
        Purchase_Date: "dd/mm/yyyy",
        Sold_To: "Name",
        Sold_To_Contact_No: 9956471589,
        Sold_Price: 25000,
        Sold_Date: "dd/mm/yyyy",
      },
    ];
  
    let workbook = XLSX.utils.book_new();
    let worksheet = XLSX.utils.json_to_sheet(data);
  
    // Set custom column widths for each column heading
    const columnWidths = [
      // ... column widths ...
      { wch: 20 }, // Brand
      { wch: 20 }, // Model
      { wch: 20 }, // IMEI
      { wch: 5 }, // RAM
      { wch: 5 }, // ROM
      { wch: 15 }, // ROM_GB_or_TB
      { wch: 40 }, // Device_Condition
      { wch: 20 }, // Purchased_From
      { wch: 20 }, // Purchased_From_Contact_No
      { wch: 15 }, // Purchase_Cost
      { wch: 15 }, // Purchase_Date
      { wch: 20 }, // Sold_To
      { wch: 20 }, // Sold_To_Contact_No
      { wch: 15 }, // Sold_Price
      { wch: 15 }, // Sold_Date
    ];
  
    // Set IMEI column format as text
  
    // Set custom column widths in the worksheet
    worksheet['!cols'] = columnWidths;
  
    XLSX.utils.book_append_sheet(workbook, worksheet, "sheet");
    XLSX.writeFile(workbook, "bulk_upload_template.xlsx");
  };
  

  return (
    <div
      className="mt-3
    "
    >
      <h2 className=" mb-3 ">Bulk Upload</h2>
      <label htmlFor="fileSelect">Select File:</label>

      <input
        className="d-block mb-3 mt-1"
        id="fileSelect"
        type="file"
        accept=".xlsx, .xls, .csv"
        onChange={handleFileSelection}
      />

      {error.is_error && <div className="text-danger">{error.message}</div>}
      <div className="row">
        <div className="col-lg-3 col-md-6 col-sm-12 d-flex justify-content-between">
          <button
            className="btn btn-primary"
            onClick={uploadBulkData}
            disabled={error.is_error ?? devicesList.length == 0}
          >
            Upload
          </button>

          <button className="btn btn-secondary" onClick={downloadTemplate}>
            Download Template
          </button>
        </div>
      </div>
    </div>
  );
};

export default FileUpload;
