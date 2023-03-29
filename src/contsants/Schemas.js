import * as yup from "yup";
export const user_login_schema = yup.object({
  email: yup
    .string()
    .email("Enter a valid Email Id")
    .required("Email Id is required"),
  // password: yup
  // 	.string()
  // 	.matches(
  // 		/^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
  // 		"Password must contain at least 8 characters, one uppercase, one number and one special case character"
  // 	)
  // 	.required("Password is required"),
});

export const device_schema = yup.object().shape({
  brand: yup.string().trim().required("Brand is required"),
  model: yup.string().trim().required("Model is required"),
  imei: yup.number().required("IMEI is required"),
  ram: yup
    .number()
    .integer("RAM must be an integer")
    .min(0, "RAM cannot be negative")
    .nullable(),
  rom: yup
    .number()
    .integer("ROM must be an integer")
    .min(0, "ROM cannot be negative")
    .nullable(),
  deviceCondition: yup.string().nullable(),
  purchasedFrom: yup.string().nullable(),
  purchasedFromContactNo: yup.number().nullable(),
  purchaseCost: yup.number().nullable(),
  purchaseDate: yup.date().nullable(),
  soldTo: yup.string().nullable(),
  soldToContactNumber: yup.string().nullable(),
  soldPrice: yup.number().nullable(),
  soldDate: yup.date().nullable(),
  profit: yup.number().nullable(),
});
