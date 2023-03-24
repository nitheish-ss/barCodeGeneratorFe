import { useFormikContext } from "formik";

const Input = (props) => {
  const { getFieldProps, getFieldMeta } = useFormikContext();
  const { type, label, name, placeholder, value, handleChange, isSubmitting } =
    props;

  return (
    <div className="form-group">
      <label>{label}</label>
      <input
        className="form-control"
        name={name}
        type={type}
        placeholder={placeholder}
        value={getFieldProps(name).value}
        onChange={getFieldProps(name).onChange}
        onBlur={getFieldProps(name).onBlur}
        disabled={isSubmitting}
      />

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
