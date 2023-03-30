import * as yup from "yup";
const phoneRegExp = /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[56789]\d{9}$/;
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
  imei: yup
    .string()
    .matches(/^\d{15}$/, "Number must be exactly 15 digits")
    .required("Number is required"),
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
  purchasedFromContactNo: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .nullable(),
  purchaseCost: yup
    .number()
    .min(0, "Purchase cost cannot be negative")
    .nullable(),
  purchaseDate: yup.date().nullable(),
  soldTo: yup.string().nullable(),
  soldToContactNo: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .nullable(),
  soldPrice: yup.number().min(0, "Sold price cannot be negative").nullable(),
  soldDate: yup.date().nullable(),
  profit: yup.number().nullable(),
});
