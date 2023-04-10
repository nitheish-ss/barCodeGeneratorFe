import React, { useState, useRef } from "react";
import Webcam from "react-webcam";
import Tesseract from "tesseract.js";

const Scanner = (props) => {
  const [textData, setTextData] = useState("");
  const [capturedImage, setCapturedImage] = useState(null);
  const [capturedImeiNumbers, setCapturedImeiNumbers] = useState([]);
  const [isCameraOpen, setIsCameraOpen] = useState(false); // Added state for camera open/close
  const webcamRef = useRef(null);
  const imeiRegex = /\b\d{15}\b/g;

  const captureImage = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedImage(imageSrc);
    recognizeText(imageSrc);
    setIsCameraOpen(false); // Close the camera after capturing image
  };

  const handleImageUpload = (event) => {
    const imageFile = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const imageSrc = e.target.result;
      setCapturedImage(imageSrc);
      recognizeText(imageSrc);
    };
    reader.readAsDataURL(imageFile);
    setIsCameraOpen(false); // Close the camera after uploading image
  };

  const recognizeText = (imageSrc) => {
    Tesseract.recognize(imageSrc, "eng")
      .then(({ data: { text } }) => {
        setTextData(text);
        const extractedImeiNumbers = text.match(imeiRegex);
        if (extractedImeiNumbers) {
          setCapturedImeiNumbers(extractedImeiNumbers);
        } else {
          setCapturedImeiNumbers([]);
        }
      })
      .catch((error) => {
        console.error("Error in OCR: ", error);
      });
  };

  const toggleCamera = () => {
    setCapturedImage(null);
    setIsCameraOpen(!isCameraOpen);
  };

  return (
    <>
      <Webcam
        ref={webcamRef}
        width={"100%"}
        videoConstraints={{ facingMode: "environment" }} // Toggle between front and back camera
        style={{ display: isCameraOpen ? "block" : "none" }} // Hide webcam when not open
      />
      {capturedImage && (
        <img
          src={capturedImage}
          alt="Captured Image"
          width="100%"
          height="100%"
        />
      )}
      {isCameraOpen ? (
        <button onClick={captureImage}>Capture and Recognize</button>
      ) : (
        <button onClick={toggleCamera}>Open Camera</button>
      )}
      <div>{textData}</div>
      <div>
        <h3>Extracted IMEI Numbers</h3>
        {capturedImeiNumbers.length > 0 ? (
          <ul>
            {capturedImeiNumbers.map((imei, index) => (
              <li key={index}>{imei}</li>
            ))}
          </ul>
        ) : (
          <p>No IMEI numbers found.</p>
        )}
      </div>
      <h3>Upload Image</h3>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
    </>
  );
};

export default Scanner;
