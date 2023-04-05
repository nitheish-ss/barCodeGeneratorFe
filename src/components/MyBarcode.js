import React, { useState } from "react";
import Barcode from "react-barcode";
import html2canvas from "html2canvas";
import { useReactToPrint } from "react-to-print";
import ConformationModel from "../models/ConformationModel";

function MyBarcode() {
  const [imei, setImei] = useState(null);
  const [barcodes, setBarcode] = useState([]);
  const [show, setShow] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(null);

  const printRef = React.useRef();

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  });
  const genBarCode = () => {
    if (!validateInput()) return;
    setBarcode((previousValue) => [...previousValue, imei]);
    setImei("");
  };

  const handleDelete = () => {
    setBarcode((previousValue) => [
      ...previousValue.slice(0, currentIndex),
      ...previousValue.slice(currentIndex + 1),
    ]);
  };

  const handleClose = () => {
    setShow(false);
  };

  function validateInput() {
    console.log("call");
    const numberRegex = /^\d{15}$/; // check if input is 15 digits
    const nonZeroRegex = /^[1-9]\d{0,14}$/; // check if input is non-zero
    if (!numberRegex.test(imei) || !nonZeroRegex.test(imei)) {
      return false; // input is not valid
    }
    return true; // input is valid
  }
  return (
    <div>
      <div className="d-flex align-items-center justify-content-between mt-2 mb-2 gap-2">
        <div className="d-flex align-items-center justify-content-center gap-2">
          <input
            class="form-control"
            type="number"
            placeholder="Enter Valid IMEI"
            value={imei}
            onChange={(e) => setImei(e.target.value)}
          />
          <button
            className={`btn ${
              validateInput() ? "btn-secondary" : "btn-outline-secondary"
            }`}
            type="button"
            onClick={genBarCode}
            disabled={!validateInput()}
          >
            Generate
          </button>
        </div>
        <div className="d-flex align-items-center justify-content-center">
          <button
            className="btn btn-primary"
            type="button"
            onClick={handlePrint}
          >
            Print
          </button>
        </div>
      </div>
      <div
        className="d-flex flex-wrap align-items-center justify-content-start"
        ref={printRef}
      >
        {barcodes &&
          barcodes.map((item, index) => (
            <div
              key={index}
              onClick={() => {
                setCurrentIndex(index);
                setShow(true);
              }}
            >
              <Barcode
                value={item}
                lineColor="#000000"
                background="#FFFFFF"
                height={30}
                fontSize={15}
              />
            </div>
          ))}
      </div>
      <ConformationModel
        show={show}
        title={"Confirm Delete"}
        content={"Are you sure, you want to delete this Barcode?"}
        positiveButton={"Yes"}
        handlePositive={handleDelete}
        negativeButton={" No "}
        handleNegative={() => {}}
        handleClose={handleClose}
      />
    </div>
  );
}

export default MyBarcode;

// const handleDownloadImage = async () => {
//   const element = printRef.current;
//   const canvas = await html2canvas(element);

//   const data = canvas.toDataURL("image/jpg");
//   const link = document.createElement("a");

//   if (typeof link.download === "string") {
//     link.href = data;
//     link.download = "image.jpg";

//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   } else {
//     window.open(data);
//   }
// };
