import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getDeviceByImei } from "../services/deviceService";
import { useZxing } from "react-zxing";
function Scanner() {
  const [data, setData] = useState("Not Found");
  const navigate = useNavigate();
  useEffect(() => {
    if (data === "Not Found") return;
    if (data.length === 15) {
      getDeviceData(data);
    }
  }, [data]);
  const {
    ref,
    torch: { on, off, isOn, isAvailable },
  } = useZxing({
    onResult(result) {
      setData(result.getText());
    },
  });
  const getDeviceData = async (data) => {
    try {
      const result = await getDeviceByImei(data);
      if (result?._id) {
        navigate(`/devices/viewDevice/${result?._id}`);
      }
    } catch {
      toast.error("Device Not Found");
    }
  };
  return (
    <>
      <div className="col">
        <video height={500} ref={ref} />
        <p>{data}</p>
        {isAvailable ? (
          <button
            className="btn btn-secondary"
            onClick={() => (isOn ? off() : on())}
          >
            {isOn ? "Turn off" : "Turn on"} torch
          </button>
        ) : (
          <strong>Please Turn on Torch If lighting is Bad.</strong>
        )}
      </div>
    </>
  );
}

export default Scanner;
