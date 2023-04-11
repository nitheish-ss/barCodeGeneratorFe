import React, { useState, useRef, useEffect } from "react";
import { FaCamera } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Tesseract, { createWorker } from "tesseract.js";
import { getDeviceByImei } from "../services/deviceService";

const Scanner = (props) => {
  const [textData, setTextData] = useState("");
  const [capturedImage, setCapturedImage] = useState(null);
  const [capturedImeiNumbers, setCapturedImeiNumbers] = useState([]);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [isRecognizing, setIsRecognizing] = useState(false);
  const navigate = useNavigate(); // Added state for loader
  const webcamRef = useRef(null);
  const imeiRegex = /\b\d{15}\b/g;

  useEffect(() => {
    if (!capturedImeiNumbers) return;
    if (capturedImeiNumbers.length > 0) {
      getDeviceData(capturedImeiNumbers);
    }
  }, [capturedImeiNumbers]);
  const getDeviceData = async (data) => {
    try {
      const result = await getDeviceByImei(data.shift());
      if (result?._id) {
        navigate(`/devices/viewDevice/${result?._id}`);
      }
    } catch {
      if (data.length > 0) getDeviceData(data);
      else {
        toast.error("Device Not Found");
      }
    } finally {
      return;
    }
  };

  const handleImageUpload = (event) => {
    const imageFile = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const imageSrc = e.target.result;
      setCapturedImage(imageSrc);
      setIsRecognizing(true); // Show loader while recognizing text
      recognizeText(imageSrc);
    };
    reader.readAsDataURL(imageFile);
    setIsCameraOpen(false);
  };

  const recognizeText = async (imageSrc) => {
    const worker = await createWorker({
      logger: (m) => console.log(m),
    });
    (async () => {
      await worker.loadLanguage("eng");
      await worker.initialize("eng");
      await worker.setParameters({
        // tessedit_char_whitelist: "0123456789",
      });
      const {
        data: { text },
      } = await worker.recognize(imageSrc);
      setTextData(text);
      setIsRecognizing(false);
      await worker.terminate();
      const extractedImeiNumbers = text.match(imeiRegex);
      if (extractedImeiNumbers) {
        setCapturedImeiNumbers(extractedImeiNumbers);
      } else {
        setCapturedImeiNumbers([]);
      }
      setIsRecognizing(false);
    })();
  };

  return (
    <>
      <label for="inputTag" style={{ cursor: "pointer" }}>
        <FaCamera size={100} />
        <input
          id="inputTag"
          style={{ display: "none" }}
          type="file"
          accept="image/*"
          capture={"environment"}
          onChange={handleImageUpload}
        />
      </label>
      {capturedImage && (
        <img
          src={capturedImage}
          alt="Captured Image"
          width="100%"
          height="100%"
        />
      )}
      {isRecognizing && <div>Loading...</div>}{" "}
      {/* Show loader while recognizing text */}
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
    </>
  );
};

export default Scanner;
