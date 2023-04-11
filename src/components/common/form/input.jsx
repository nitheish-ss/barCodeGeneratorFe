import { useFormikContext } from "formik";

const Input = (props) => {
  const { getFieldProps, getFieldMeta } = useFormikContext();
  const {
    type,
    label,
    name,
    placeholder,
    value,
    handleChange,
    isSubmitting,
    endElement = undefined,
  } = props;

  return (
    <div className="form-group ">
      <label>{label}</label>
      <div className="d-flex align-items-center justify-content-center gap-2 form-control">
        <input
          className="form-control-plaintext"
          name={name}
          type={type}
          placeholder={placeholder}
          value={getFieldProps(name).value}
          onChange={getFieldProps(name).onChange}
          onBlur={getFieldProps(name).onBlur}
          disabled={isSubmitting}
        />
        {endElement && endElement}
      </div>

      {getFieldMeta(name).error !== undefined &&
      getFieldMeta(name).touched === true ? (
        <p className="text-danger">
          <b>{getFieldMeta(name).error}</b>
        </p>
      ) : null}
    </div>
  );
};

export default Input;
