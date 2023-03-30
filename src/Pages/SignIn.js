/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import SignInForm from "../components/SignInForm";
import { Formik, Form } from "formik";
import { user_login_initial_values } from "../contsants/Variables";
import { user_login_schema } from "../contsants/Schemas";
import { login } from "../services/auth";
import { getCurrentUser } from "../services/user";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

const SignIn = () => {
  const handleFormSubmit = async (e, values) => {
    e.preventDefault();
    let body = {
      email: values.email,
      password: values.password,
    };

    try {
      let { status, data } = await login(body);
      if (status === 200) {
        window.location = "/";
        toast.success("User Verified Successfully");
      } else {
        toast.error("Authentication failed");
      }
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  if (getCurrentUser()) return <Navigate to="/" />;

  return (
    <div className="container-fluid">
      <div className="row min-vh-100 align-items-center">
        <div className="col-md-6 offset-md-3">
          <Formik
            initialValues={user_login_initial_values}
            enableReinitialize={true}
            validationSchema={user_login_schema}
            validateOnMount
            onSubmit={(values, actions) => {
              setTimeout(() => {
                alert(JSON.stringify(values, null, 2));
                actions.setSubmitting(false);
              }, 1000);
            }}
          >
            {(formikProps) => (
              <Form onSubmit={(e) => handleFormSubmit(e, formikProps.values)}>
                <SignInForm />
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};
export default SignIn;
