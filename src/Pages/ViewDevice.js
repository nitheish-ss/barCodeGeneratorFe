import React from "react";
import DeviceElement from "../components/DeviceElement";
import { useParams } from "react-router-dom";
const ViewDevice = () => {
  const { id } = useParams();
  return <DeviceElement id={id} />;
};
export default ViewDevice;
