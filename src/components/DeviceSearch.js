import React from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { FaSearch } from "react-icons/fa";
const DeviceSearch = (props) => {
  const search = (key, value) => {
    props.setSearch((previousSearch) => {
      return { ...previousSearch, [key]: value };
    });
  };
  return (
    <div className="d-flex align-items-center justify-content-between gap-3  overflow-auto">
      <InputGroup className="mb-2 mt-2" style={{ minWidth: "300px" }}>
        <InputGroup.Text id="basic-addon1">
          <FaSearch />
        </InputGroup.Text>
        <Form.Control
          type="Number"
          placeholder="IMEI"
          name="imei"
          onChange={(e) => {
            search(e.target.name, e.target.value);
          }}
        />
      </InputGroup>
      <InputGroup className="mb-2 mt-2" style={{ minWidth: "300px" }}>
        <InputGroup.Text id="basic-addon1">
          <FaSearch />
        </InputGroup.Text>
        <Form.Control
          type="String"
          placeholder="Brand"
          name="brand"
          onChange={(e) => {
            search(e.target.name, e.target.value);
          }}
        />
      </InputGroup>
      <InputGroup className="mb-2 mt-2" style={{ minWidth: "300px" }}>
        <InputGroup.Text id="basic-addon1">
          <FaSearch />
        </InputGroup.Text>
        <Form.Control
          type="String"
          placeholder="Model"
          name="model"
          onChange={(e) => {
            search(e.target.name, e.target.value);
          }}
        />
      </InputGroup>
      <InputGroup className="mb-2 mt-2" style={{ minWidth: "300px" }}>
        <InputGroup.Text id="basic-addon1">
          <FaSearch />
        </InputGroup.Text>
        <Form.Control
          type="Number"
          placeholder="RAM"
          name="ram"
          onChange={(e) => {
            search(e.target.name, e.target.value);
          }}
        />
      </InputGroup>
      <InputGroup className="mb-2 mt-2" style={{ minWidth: "300px" }}>
        <InputGroup.Text id="basic-addon1">
          <FaSearch />
        </InputGroup.Text>
        <Form.Control
          type="Number"
          placeholder="ROM"
          name="rom"
          onChange={(e) => {
            search(e.target.name, e.target.value);
          }}
        />
      </InputGroup>
      <InputGroup className="mb-2 mt-2" style={{ minWidth: "300px" }}>
        <InputGroup.Text id="basic-addon1">
          <FaSearch />
        </InputGroup.Text>
        <Form.Control
          type="String"
          placeholder="Purchased From"
          name="purchasedFrom"
          onChange={(e) => {
            search(e.target.name, e.target.value);
          }}
        />
      </InputGroup>
      <InputGroup className="mb-2 mt-2" style={{ minWidth: "300px" }}>
        <InputGroup.Text id="basic-addon1">
          <FaSearch />
        </InputGroup.Text>
        <Form.Control
          type="String"
          placeholder="Purchased Contact"
          name="purchasedFromContactNo"
          onChange={(e) => {
            search(e.target.name, e.target.value);
          }}
        />
      </InputGroup>
      <InputGroup className="mb-2 mt-2" style={{ minWidth: "300px" }}>
        <InputGroup.Text id="basic-addon1">
          <FaSearch />
        </InputGroup.Text>
        <Form.Control
          type="Number"
          placeholder="Purchase Cost"
          name="purchaseCost"
          onChange={(e) => {
            search(e.target.name, e.target.value);
          }}
        />
      </InputGroup>
      <InputGroup className="mb-2 mt-2" style={{ minWidth: "300px" }}>
        <InputGroup.Text id="basic-addon1">
          <FaSearch />
          &nbsp;&nbsp;&nbsp;Purchase Date
        </InputGroup.Text>
        <Form.Control
          type="Date"
          placeholder="Purchase Date"
          name="purchaseDate"
          onChange={(e) => {
            search(e.target.name, e.target.value);
          }}
        />
      </InputGroup>
      <InputGroup className="mb-2 mt-2" style={{ minWidth: "300px" }}>
        <InputGroup.Text id="basic-addon1">
          <FaSearch />
        </InputGroup.Text>
        <Form.Control
          type="String"
          placeholder="Sold To"
          name="soldTo"
          onChange={(e) => {
            search(e.target.name, e.target.value);
          }}
        />
      </InputGroup>
      <InputGroup className="mb-2 mt-2" style={{ minWidth: "300px" }}>
        <InputGroup.Text id="basic-addon1">
          <FaSearch />
        </InputGroup.Text>
        <Form.Control
          type="String"
          placeholder="Sold Contact"
          name="soldContactNo"
          onChange={(e) => {
            search(e.target.name, e.target.value);
          }}
        />
      </InputGroup>
      <InputGroup className="mb-2 mt-2" style={{ minWidth: "300px" }}>
        <InputGroup.Text id="basic-addon1">
          <FaSearch />
        </InputGroup.Text>
        <Form.Control
          type="Number"
          placeholder="Sold Price"
          name="soldPrice"
          onChange={(e) => {
            search(e.target.name, e.target.value);
          }}
        />
      </InputGroup>
      <InputGroup className="mb-2 mt-2" style={{ minWidth: "300px" }}>
        <InputGroup.Text id="basic-addon1">
          <FaSearch />
          &nbsp;&nbsp;&nbsp;Sold Date
        </InputGroup.Text>

        <Form.Control
          type="Date"
          placeholder="Sold Date"
          name="soldDate"
          onChange={(e) => {
            search(e.target.name, e.target.value);
          }}
        />
      </InputGroup>
      <InputGroup className="mb-2 mt-2" style={{ minWidth: "300px" }}>
        <InputGroup.Text id="basic-addon1">
          <FaSearch />
        </InputGroup.Text>
        <Form.Control
          type="Number"
          placeholder="Profit"
          name="profit"
          onChange={(e) => {
            search(e.target.name, e.target.value);
          }}
        />
      </InputGroup>
    </div>
  );
};

export default DeviceSearch;
