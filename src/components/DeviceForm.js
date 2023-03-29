import { Formik, Form, Field, ErrorMessage } from "formik";
import React from "react";
import { device_initialValues } from "../contsants/Variables";
import { device_schema } from "../contsants/Schemas";
import { addNewDevice } from "../services/deviceService";
import { toast } from "react-toastify";

const DeviceForm = () => {
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    Object.keys(values).forEach(
      (k) =>
        (values[k] =
          values[k] === ""
            ? null
            : typeof values[k] === "string"
            ? values[k].trim()
            : values[k])
    );
    console.log(values);
    const result = await addNewDevice(values);
    if (result.success) {
      toast.success(result.message);
      resetForm();
    } else {
      toast.error(result.message);
    }
    setSubmitting(false);
  };
  const numberInputOnWheelPreventChange = (e) => {
    // Prevent the input value change
    e.target.blur();

    // Prevent the page/container scrolling
    e.stopPropagation();

    // Refocus immediately, on the next tick (after the current
    // function is done)
    setTimeout(() => {
      e.target.focus();
    }, 0);
  };
  return (
    <Formik
      initialValues={device_initialValues}
      validationSchema={device_schema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, resetForm }) => (
        <Form>
          <div className="row" style={{ backgroundColor: "" }}>
            <div className="col-md-8 offset-md-2">
              <div className="form-group mt-3">
                <label for="brand">Brand</label>
                <Field
                  className="form-control form-control-lg"
                  type="text"
                  name="brand"
                />
                <ErrorMessage
                  component="div"
                  style={{ color: "red" }}
                  name="brand"
                />
              </div>

              <div className="form-group mt-3">
                <label for="model">Model</label>
                <Field
                  className="form-control form-control-lg"
                  type="text"
                  name="model"
                />
                <ErrorMessage
                  component="div"
                  style={{ color: "red" }}
                  name="model"
                />
              </div>

              <div className="form-group mt-3">
                <label for="imei">IMEI</label>
                <Field
                  className="form-control form-control-lg"
                  type="number"
                  name="imei"
                  onWheel={numberInputOnWheelPreventChange}
                />
                <ErrorMessage
                  component="div"
                  style={{ color: "red" }}
                  name="imei"
                />
              </div>

              <div className="form-group mt-3">
                <label for="ram">RAM</label>
                <Field
                  className="form-control form-control-lg "
                  name="ram"
                  type="number"
                  onWheel={numberInputOnWheelPreventChange}
                />
                <ErrorMessage
                  component="div"
                  style={{ color: "red" }}
                  name="ram"
                />
              </div>

              <div className="form-group mt-3">
                <label for="rom">ROM (Internal Storage)</label>
                <Field
                  className="form-control form-control-lg"
                  name="rom"
                  type="number"
                  onWheel={numberInputOnWheelPreventChange}
                />

                <ErrorMessage
                  component="div"
                  style={{ color: "red" }}
                  name="rom"
                />
              </div>

              <div className="form-group mt-3">
                <label for="deviceCondition">Device Condition</label>
                <Field
                  className="form-control form-control-lg text-area"
                  type="text-area"
                  component="textarea"
                  rows="4"
                  name="deviceCondition"
                />
                <ErrorMessage
                  component="div"
                  style={{ color: "red" }}
                  name="deviceCondition"
                />
              </div>

              <div className="form-group mt-3">
                <label for="purchasedFrom">Purchased From</label>
                <Field
                  className="form-control form-control-lg"
                  type="text"
                  name="purchasedFrom"
                />
                <ErrorMessage
                  component="div"
                  style={{ color: "red" }}
                  name="purchasedFrom"
                />
              </div>

              <div className="form-group mt-3">
                <label for="purchasedFromContactNo">
                  Purchased From Contact No.
                </label>
                <Field
                  className="form-control form-control-lg"
                  name="purchasedFromContactNo"
                  type="number"
                  onWheel={numberInputOnWheelPreventChange}
                />
                <ErrorMessage
                  component="div"
                  style={{ color: "red" }}
                  name="purchasedFromContactNo"
                />
              </div>
              <div className="form-group mt-3">
                <label for="purchaseCost">Purchase Cost</label>
                <Field
                  className="form-control form-control-lg"
                  name="purchaseCost"
                  type="number"
                  onWheel={numberInputOnWheelPreventChange}
                />
                <ErrorMessage
                  component="div"
                  style={{ color: "red" }}
                  name="purchaseCost"
                />
              </div>

              <div className="form-group mt-3">
                <label for="purchaseDate">Purchase Date</label>
                <Field
                  className="form-control form-control-lg"
                  name="purchaseDate"
                  type="date"
                />
                <ErrorMessage
                  component="div"
                  style={{ color: "red" }}
                  name="purchaseDate"
                />
              </div>

              <div className="form-group mt-3">
                <label for="soldTo">Sold To</label>
                <Field
                  className="form-control form-control-lg"
                  type="text"
                  name="soldTo"
                />
                <ErrorMessage
                  component="div"
                  style={{ color: "red" }}
                  name="soldTo"
                />
              </div>

              <div className="form-group mt-3">
                <label for="soldToContactNo">Sold To Contact No.</label>
                <Field
                  className="form-control form-control-lg"
                  name="soldToContactNo"
                  type="number"
                  onWheel={numberInputOnWheelPreventChange}
                />
                <ErrorMessage
                  component="div"
                  style={{ color: "red" }}
                  name="soldToContactNo"
                />
              </div>

              <div className="form-group mt-3">
                <label for="soldPrice">Sold Price</label>
                <Field
                  className="form-control form-control-lg"
                  name="soldPrice"
                  type="number"
                  onWheel={numberInputOnWheelPreventChange}
                />
                <ErrorMessage
                  component="div"
                  style={{ color: "red" }}
                  name="soldPrice"
                />
              </div>

              <div className="form-group mt-3">
                <label for="soldDate">Sold Date</label>
                <Field
                  className="form-control form-control-lg"
                  name="soldDate"
                  type="date"
                />
                <ErrorMessage
                  component="div"
                  style={{ color: "red" }}
                  name="soldDate"
                />
              </div>

              <div className="form-group mt-3">
                <label for="profit">Profit</label>
                <Field
                  className="form-control form-control-lg"
                  name="profit"
                  type="number"
                  onWheel={numberInputOnWheelPreventChange}
                />
                <ErrorMessage
                  component="div"
                  style={{ color: "red" }}
                  name="profit"
                />
              </div>
              <div className="d-flex align-items-center justify-content-between mt-3 mb-3">
                <div className="">
                  <button
                    className="btn btn-primary btn-lg"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    Submit
                  </button>
                </div>
                <div className="">
                  <button
                    className="btn btn-secondary btn-lg"
                    type="reset"
                    disabled={isSubmitting}
                    onClick={resetForm}
                  >
                    Reset
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default DeviceForm;
