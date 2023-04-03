import { returnStatement } from "@babel/types";
import React, { useEffect, useState } from "react";
import BarcodeScannerComponent from "react-qr-barcode-scanner";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getDeviceByImei } from "../services/deviceService";
function Scanner() {
  const [data, setData] = useState("Not Found");
  const [torchOn, setTorchOn] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (data === "Not Found") return;
    if (data.length === 15) {
      getDeviceData(data);
    }
  }, [data]);
  const getDeviceData = async (data) => {
    try {
      const result = await getDeviceByImei(data);
      if (result?._id) {
        navigate(`/devices/viewDevice/${result?._id}`);
      }
    } catch {
      toast.error("error");
    }
  };
  return (
    <>
      <BarcodeScannerComponent
        height={500}
        torch={torchOn}
        onUpdate={(err, result) => {
          if (result) setData(result.text);
          else setData("Not Found");
        }}
      />
      <p>{data}</p>
      <button onClick={() => setTorchOn(!torchOn)}>
        Switch Torch {torchOn ? "Off" : "On"}
      </button>
    </>
  );
}

export default Scanner;
