import React, { useEffect, useState } from "react";
import DeviceForm from "../components/DeviceForm";
import { useParams } from "react-router-dom";
import { getDeviceById } from "../services/deviceService";
import { toast } from "react-toastify";
const UpdateDevice = () => {
  const { id } = useParams();
  const [deviceInfo, setDeviceInfo] = useState(null);
  useEffect(() => {
    getDeviceData();
  }, [id]);
  const getDeviceData = async () => {
    try {
      const result = await getDeviceById(id);
      setDeviceInfo(result);
    } catch (error) {
      toast.error("error occured while fetching device data");
    }
  };
  return <>{deviceInfo && <DeviceForm id={id} deviceData={deviceInfo} />}</>;
};
export default UpdateDevice;
