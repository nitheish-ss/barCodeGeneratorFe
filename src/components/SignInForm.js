import React, { useState } from "react";
import { useFormikContext } from "formik";
import Input from "./common/form/input";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const SignInFrom = () => {
  const { isSubmitting } = useFormikContext();
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <div>
      <h2>Sign In</h2>
      <div>
        <Input type="email" label="Email" name="email" placeholder="Email" />
        {/* <div className="relative"> */}
        <Input
          type={showPassword ? "text" : "password"}
          label="Password"
          name="password"
          placeholder="Password"
          endElement={
            <>
              <div
                // className="absolute right-3 top-1/2 transform -translate-y-1/2 d-inline"
                onClick={handlePasswordVisibility}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </>
          }
        />
        {/* </div> */}
      </div>

      <div className="mt-2">
        <button className="btn btn-block btn-primary" disabled={isSubmitting}>
          Submit
        </button>
      </div>
    </div>
  );
};
export default SignInFrom;
