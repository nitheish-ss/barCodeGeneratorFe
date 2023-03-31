import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getDeviceById } from "../services/deviceService";
import { useNavigate } from "react-router";
import Carousel from "react-bootstrap/Carousel";
import mobile1 from "../assets/mobileCarousel/14profv.jpg";
import mobile2 from "../assets/mobileCarousel/14prorv.jpg";
import mobile3 from "../assets/mobileCarousel/14prosw.jpg";
import mobile4 from "../assets/mobileCarousel/omview.jpg";
import { Table, TableContainer, TableRow } from "@mui/material";
import Paper from "@mui/material/Paper";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import TableBody from "@mui/material/TableBody";
import { numberToRupee } from "../utils/numberToRupee";
import { stringToDate } from "../utils/stringToDate";
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    outerWidth: 50,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 16,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const DeviceElement = (props) => {
  const [deviceInfo, setDeviceInfo] = useState(null);
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    getDeviceData();
  }, [props]);
  const getDeviceData = async () => {
    try {
      const result = await getDeviceById(props?.id);
      setDeviceInfo(result);
    } catch (error) {
      toast.error(error?.response.data.message);
      navigate("/devices");
    }
  };
  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  console.log(deviceInfo);
  return (
    <div>
      <Carousel activeIndex={index} onSelect={handleSelect} variant="dark">
        <Carousel.Item>
          <div className="">
            <img
              className="mx-auto d-block img-thumbnail"
              src={mobile1}
              alt="First slide"
              style={{ height: "50vh" }}
            />
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div className="">
            <img
              className="mx-auto d-block img-thumbnail"
              src={mobile2}
              alt="Second slide"
              style={{ height: "50vh" }}
            />
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div className="">
            <img
              className="mx-auto d-block img-thumbnail"
              src={mobile3}
              alt="Third slide"
              style={{ height: "50vh" }}
            />
          </div>
        </Carousel.Item>
      </Carousel>
      <div className="container-fluid">
        <TableContainer component={Paper}>
          <Table aria-label="customized table">
            <TableBody>
              <StyledTableRow>
                <StyledTableCell align="left" width="50%">
                  Brand
                </StyledTableCell>
                <StyledTableCell align="left" width="50%">
                  {deviceInfo?.brand}
                </StyledTableCell>
              </StyledTableRow>
              <StyledTableRow>
                <StyledTableCell
                  alighn="left"
                  width="50%"
                  component="th"
                  scope="row"
                >
                  Model
                </StyledTableCell>
                <StyledTableCell align="left" width="50%">
                  {deviceInfo?.model}
                </StyledTableCell>
              </StyledTableRow>
              <StyledTableRow>
                <StyledTableCell
                  align="left"
                  width="50%"
                  component="th"
                  scope="row"
                >
                  IMEI
                </StyledTableCell>
                <StyledTableCell align="left" width="50%">
                  {deviceInfo?.imei}
                </StyledTableCell>
              </StyledTableRow>
              <StyledTableRow>
                <StyledTableCell
                  align="left"
                  width="50%"
                  component="th"
                  scope="row"
                >
                  RAM
                </StyledTableCell>
                <StyledTableCell align="left" width="50%">
                  {deviceInfo?.ram} {deviceInfo?.ram ? "GB" : ""}
                </StyledTableCell>
              </StyledTableRow>
              <StyledTableRow>
                <StyledTableCell
                  align="left"
                  width="50%"
                  component="th"
                  scope="row"
                >
                  ROM
                </StyledTableCell>
                <StyledTableCell align="left" width="50%">
                  {deviceInfo?.rom} {deviceInfo?.rom ? deviceInfo?.romUnit : ""}
                </StyledTableCell>
              </StyledTableRow>
              <StyledTableRow>
                <StyledTableCell
                  align="left"
                  width="50%"
                  component="th"
                  scope="row"
                >
                  Device Condition
                </StyledTableCell>
                <StyledTableCell align="left" width="50%">
                  {deviceInfo?.deviceCondition}
                </StyledTableCell>
              </StyledTableRow>
              <StyledTableRow>
                <StyledTableCell
                  align="left"
                  width="50%"
                  component="th"
                  scope="row"
                >
                  Purchased From
                </StyledTableCell>
                <StyledTableCell align="left" width="50%">
                  {deviceInfo?.purchasedFrom}
                </StyledTableCell>
              </StyledTableRow>
              <StyledTableRow>
                <StyledTableCell
                  align="left"
                  width="50%"
                  component="th"
                  scope="row"
                >
                  Purchased Contact
                </StyledTableCell>
                <StyledTableCell align="left" width="50%">
                  {deviceInfo?.purchasedFromContactNo}
                </StyledTableCell>
              </StyledTableRow>
              <StyledTableRow>
                <StyledTableCell
                  align="left"
                  width="50%"
                  component="th"
                  scope="row"
                >
                  Purchase Cost
                </StyledTableCell>
                <StyledTableCell align="left" width="50%">
                  {numberToRupee(deviceInfo?.purchaseCost)}
                </StyledTableCell>
              </StyledTableRow>
              <StyledTableRow>
                <StyledTableCell
                  align="left"
                  width="50%"
                  component="th"
                  scope="row"
                >
                  Purchase Date
                </StyledTableCell>
                <StyledTableCell align="left" width="50%">
                  {stringToDate(deviceInfo?.purchaseDate)}
                </StyledTableCell>
              </StyledTableRow>
              <StyledTableRow>
                <StyledTableCell
                  align="left"
                  width="50%"
                  component="th"
                  scope="row"
                >
                  Sold To
                </StyledTableCell>
                <StyledTableCell align="left" width="50%">
                  {deviceInfo?.soldTo}
                </StyledTableCell>
              </StyledTableRow>
              <StyledTableRow>
                <StyledTableCell
                  align="left"
                  width="50%"
                  component="th"
                  scope="row"
                >
                  Sold Contact
                </StyledTableCell>
                <StyledTableCell align="left" width="50%">
                  {deviceInfo?.soldToContactNo}
                </StyledTableCell>
              </StyledTableRow>
              <StyledTableRow>
                <StyledTableCell
                  align="left"
                  width="50%"
                  component="th"
                  scope="row"
                >
                  Sold Price
                </StyledTableCell>
                <StyledTableCell align="left" width="50%">
                  {numberToRupee(deviceInfo?.soldPrice)}
                </StyledTableCell>
              </StyledTableRow>
              <StyledTableRow>
                <StyledTableCell
                  align="left"
                  width="50%"
                  component="th"
                  scope="row"
                >
                  Sold Date
                </StyledTableCell>
                <StyledTableCell align="left" width="50%">
                  {stringToDate(deviceInfo?.soldDate)}
                </StyledTableCell>
              </StyledTableRow>
              <StyledTableRow>
                <StyledTableCell
                  align="left"
                  width="50%"
                  component="th"
                  scope="row"
                >
                  Profit
                </StyledTableCell>
                <StyledTableCell align="left" width="50%">
                  {numberToRupee(deviceInfo?.profit)}
                </StyledTableCell>
              </StyledTableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default DeviceElement;

// brand: "samsung";
// createdAt: "2023-03-31T06:58:53.396Z";
// deviceCondition: "display good, battery good, back panel good, with box and charger.";
// imei: 333333333333333;
// model: "galaxy s23 ultra";
// profit: 50000;
// purchaseCost: 120000;
// purchaseDate: "2023-03-31T00:00:00.000Z";
// purchasedFrom: "samsung.com";
// purchasedFromContactNo: 9952385056;
// ram: 12;
// rom: 256;
// romUnit: "GB";
// soldDate: "2023-03-31T00:00:00.000Z";
// soldPrice: 120000;
// soldTo: "Nitheish M";
// soldToContactNo: 9952385056;
// updatedAt: "2023-03-31T06:58:53.396Z";
// __v: 0;
// _id: "642684ad96f88c495eb305a1";
