
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