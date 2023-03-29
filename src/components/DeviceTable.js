import React, { useEffect, useState } from "react";
import { getDevices } from "../services/deviceService";
import Table from "react-bootstrap/Table";
import { FaEye, FaPen, FaTrash } from "react-icons/fa";

const DeviceTable = () => {
  const [devices, setDevices] = useState(null);
  const [pageNo, setPageNo] = useState(1);
  const [perPage, setPerpage] = useState(15);
  useEffect(() => {
    getDevicesData();
  }, []);
  const getDevicesData = async () => {
    const result = await getDevices(pageNo, perPage);
    setDevices(result?.data);
  };
  console.log(devices);
  return (
    <div className="table-responsive-xl">
      <Table className="table" striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Brand</th>
            <th>Model</th>
            <th>Imei</th>
            <th>RAM</th>
            <th>ROM (Internal Storage)</th>
            <th>Device Condition</th>
            <th>Purchased From</th>
            <th>Purchased From Contact No.</th>
            <th>Purchase Cost</th>
            <th>Purchase Date</th>
            <th>Sold To</th>
            <th>Sold To Contact No.</th>
            <th>Sold Price</th>
            <th>Sold Date</th>
            <th>Profit</th>
            <th>Tools</th>
          </tr>
        </thead>
        <tbody>
          {devices &&
            devices.map((item, index) => {
              return (
                <tr key={item?._id}>
                  <td>{(pageNo - 1) * perPage + 1 + index}</td>
                  <td>{item?.brand}</td>
                  <td>{item?.model}</td>
                  <td>{item?.imei}</td>
                  <td>{item?.ram}</td>
                  <td>{item?.rom}</td>
                  <td>{item?.deviceCondition}</td>
                  <td>{item?.purchasedFrom}</td>
                  <td>{item?.purchasedFromContactNo}</td>
                  <td>{item?.purchaseCost}</td>
                  <td>
                    {item?.purchaseDate &&
                      new Date(item?.purchaseDate).toLocaleDateString("en-GB", {
                        timeZone: "Asia/Kolkata",
                      })}
                  </td>
                  <td>{item?.soldTo}</td>
                  <td>{item?.soldToContactNo}</td>
                  <td>{item?.soldPrice}</td>
                  <td>
                    {item?.soldDate &&
                      new Date(item?.soldDate).toLocaleDateString("en-GB", {
                        timeZone: "Asia/Kolkata",
                      })}
                  </td>
                  <td>{item?.profit}</td>
                  <td>
                    <div className="d-flex align-items-center justify-content-center gap-5 px-2">
                      <button
                        style={{
                          border: "0px",
                          backgroundColor: "transparent",
                        }}
                      >
                        <FaPen />
                      </button>
                      <button
                        style={{
                          border: "0px",
                          backgroundColor: "transparent",
                        }}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
    </div>
  );
};

export default DeviceTable;
