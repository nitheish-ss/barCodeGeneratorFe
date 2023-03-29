import React from "react";
import FileUpload from "../components/FileUpload";

const BulkUpload = () => {
  return (
    <div className="container-fluid">
      <div className="row min-vh-100 align-items-center">
        <div className="col-md-6 offset-md-3">
          <FileUpload />
        </div>
      </div>
    </div>
  );
};

export default BulkUpload;
