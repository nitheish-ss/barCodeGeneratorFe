import React from "react";
import { useFormikContext } from "formik";
import Input from "./common/form/input";

const SignInFrom = () => {
  const { isSubmitting, isValid } = useFormikContext();

  return (
    <div>
      <h2>Sign In</h2>
      <div >
        <Input type="email" label="Email" name="email" placeholder="Email" />
        <Input
          type="password"
          label="Password"
          name="password"
          placeholder="Password"
        />
      </div>

      <div className="mt-2">
        <button
          className="btn btn-block btn-primary"
          disabled={isSubmitting || !isValid}
        >
          Submit
        </button>
      </div>
    </div>
  );
};
export default SignInFrom;
