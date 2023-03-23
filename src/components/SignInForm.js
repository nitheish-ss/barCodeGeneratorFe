import React from "react";
import { useFormikContext } from "formik";
import Input from "./common/form/input";

const SignInFrom = () => {
  const { isSubmitting, isValid } = useFormikContext();

  return (
    <section className="sign_in_area bg_color sec_pad">
      <div className="container-fluid">
        <div className="sign_info">
          <div className="row">
            <div className="col-lg-5"></div>
            <div className="col-lg-7">
              <div className="login_info">
                <h2 className="f_p f_600 f_size_24 t_color3 mb_40">Sign In</h2>
                <Input
                  type="email"
                  label="Email"
                  name="email"
                  placeholder="Email"
                />
                <Input
                  type="password"
                  label="Password"
                  name="password"
                  placeholder="Password"
                />
                <div className="extra mb_20"></div>
                <div className="d-grip gap-2">
                  <button
                    className="btn btn-block btn-primary"
                    disabled={isSubmitting || !isValid}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default SignInFrom;
