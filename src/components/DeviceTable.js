import { getDevices, deleteDeviceById } from "../services/deviceService";
import { FaEye, FaPen, FaTrash } from "react-icons/fa";
import React, { useEffect, useState, useRef } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/material/styles";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { numberToRupee } from "../utils/numberToRupee";
import { stringToDate } from "../utils/stringToDate";
import ConformationModel from "../models/ConformationModel";
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#6c757d",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));
const DeviceTable = () => {
  const [devices, setDevices] = useState(null);
  const [pageNo, setPageNo] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [count, setCount] = useState(0);
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const clicked = useRef(null);
  useEffect(() => {
    getDevicesData();
  }, [pageNo, perPage]);
  const getDevicesData = async () => {
    try {
      const result = await getDevices(pageNo, perPage);
      setCount(result?.count);
      setDevices(result?.data);
    } catch (error) {
      console.log(error);
      toast.error("error occured while fetching devices");
    }
  };

  const handleDelete = async () => {
    try {
      const result = await deleteDeviceById(clicked.current);
      toast.success(result.message);
      window.location.reload();
    } catch (error) {
      toast.error("error occured while deleting");
    }
  };

  const handleChangePage = (event, newPage) => {
    setPageNo(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPerPage(+event.target.value);
    setPageNo(0);
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  console.log(devices);
  return (
    <div>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: "81vh" }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <StyledTableCell>#</StyledTableCell>
                <StyledTableCell>Brand</StyledTableCell>
                <StyledTableCell>Model</StyledTableCell>
                <StyledTableCell>Imei</StyledTableCell>
                <StyledTableCell>RAM</StyledTableCell>
                <StyledTableCell>ROM</StyledTableCell>
                <StyledTableCell>Device Condition</StyledTableCell>
                <StyledTableCell>Purchased From</StyledTableCell>
                <StyledTableCell>Purchased Contact</StyledTableCell>
                <StyledTableCell>Purchase Cost</StyledTableCell>
                <StyledTableCell>Purchase Date</StyledTableCell>
                <StyledTableCell>Sold To</StyledTableCell>
                <StyledTableCell>Sold Contact</StyledTableCell>
                <StyledTableCell>Sold Price</StyledTableCell>
                <StyledTableCell>Sold Date</StyledTableCell>
                <StyledTableCell>Profit</StyledTableCell>
                <StyledTableCell>Tools</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {devices &&
                devices.map((item, index) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={item?._id}
                    >
                      <TableCell>{pageNo * perPage + 1 + index}</TableCell>
                      <TableCell>{item?.brand}</TableCell>
                      <TableCell>{item?.model}</TableCell>
                      <TableCell>{item?.imei}</TableCell>
                      <TableCell>
                        {item?.ram} {item?.ram ? "GB" : ""}
                      </TableCell>
                      <TableCell>
                        {item?.rom} {item?.rom ? item?.romUnit : ""}
                      </TableCell>
                      <TableCell>
                        {item?.deviceCondition
                          ? item?.deviceCondition.slice(0, 20)
                          : ""}
                      </TableCell>
                      <TableCell>{item?.purchasedFrom}</TableCell>
                      <TableCell>{item?.purchasedFromContactNo}</TableCell>
                      <TableCell>{numberToRupee(item?.purchaseCost)}</TableCell>
                      <TableCell>{stringToDate(item?.purchaseDate)}</TableCell>
                      <TableCell>{item?.soldTo}</TableCell>
                      <TableCell>{item?.soldToContactNo}</TableCell>
                      <TableCell>{numberToRupee(item?.soldPrice)}</TableCell>
                      <TableCell>{stringToDate(item?.soldDate)}</TableCell>
                      <TableCell>{numberToRupee(item?.profit)}</TableCell>
                      <TableCell>
                        <div className="d-flex align-items-center justify-content-center gap-3 px-2">
                          <button
                            style={{
                              border: "0px",
                              backgroundColor: "transparent",
                            }}
                            onClick={() => {
                              navigate(`/devices/viewDevice/${item?._id}`);
                            }}
                          >
                            <FaEye size={15} />
                          </button>
                          <button
                            style={{
                              border: "0px",
                              backgroundColor: "transparent",
                            }}
                          >
                            <FaPen size={15} />
                          </button>
                          <button
                            style={{
                              border: "0px",
                              backgroundColor: "transparent",
                            }}
                            onClick={() => {
                              clicked.current = item?._id;
                              handleShow();
                            }}
                          >
                            <FaTrash size={15} />
                          </button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={count}
          rowsPerPage={perPage}
          page={pageNo}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <ConformationModel
        show={show}
        title={"Confirm Delete"}
        content={"Are you sure, you want to delete this device?"}
        positiveButton={"Yes"}
        handlePositive={handleDelete}
        negativeButton={" No "}
        handleNegative={() => {}}
        handleClose={handleClose}
      />
    </div>
  );
};

export default DeviceTable;
