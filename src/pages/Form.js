import React, { useState, useEffect } from "react";
import * as yup from "yup";

import schema from "../validation/formSchema";
import "./form.css";

const initialFormData = {
  fName: "",
  lName: "",
  phone: "",
  email: "",
  promo: "",
  dropdown: "",
  specifyOther: "",
  agree: false,
};

const initialErrorValues = {
  fName: "",
  lName: "",
  phone: "",
  email: "",
  promo: "",
  dropdown: "",
  specifyOther: "",
  agree: "",
};

function Form() {
  // initialize slice of state for form data and success message
  const [formData, setFormData] = useState(initialFormData);
  const [errorValues, setErrorValues] = useState(initialErrorValues);
  const [disabled, setDisabled] = useState(true);

  // update error values by checking form values with schema
  const validate = (name, valueToUse) => {
    yup
      .reach(schema, name)
      .validate(valueToUse)
      .then(() => {
        setErrorValues({ ...errorValues, [name]: "" });
      })
      .catch((err) =>
        setErrorValues({ ...errorValues, [name]: err.errors[0] })
      );
  };

  // update form data state
  const handleChange = (evt) => {
    const { type, name, value, checked } = evt.target;
    const valueToUse = type === "checkbox" ? checked : value;
    console.log(name, valueToUse);
    setFormData({ ...formData, [name]: valueToUse });
    validate(name, valueToUse);
  };

  // clear specifyOther value if dropdown value !== other
  useEffect(() => {
    if (formData.dropdown !== "other") {
      setFormData((prevFormData) => ({ ...prevFormData, specifyOther: "" }));
    }
  }, [formData.dropdown]);

  useEffect(() => {
    schema.isValid(formData).then((valid) => {
      console.log(valid);
      setDisabled(!valid);
    });
  }, [formData]);

  return (
    <section className="form-wrapper">
      <div className="form-container">
        <div className="form-success-container">
          {!disabled && (
            <div className="form-success-card">
              <p>You have filled in all the fields correctly.</p>
            </div>
          )}
        </div>
        <h1 className="form-title">Contact Details</h1>
        <p className="form-required-notice">
          All fields with an asterisk (*) are required
        </p>
        <label htmlFor="fName" className="form-label">
          First Name<span className="required-field">*</span>
        </label>
        <input
          type="text"
          id="fName"
          className="form-input"
          name="fName"
          value={formData.fName}
          onChange={handleChange}
          placeholder="e.g. John"
          autoComplete="on"
        />
        <p className="form-error">{errorValues.fName}</p>
        <label htmlFor="lName" className="form-label">
          Last Name<span className="required-field">*</span>
        </label>
        <input
          type="text"
          id="lName"
          className="form-input"
          name="lName"
          value={formData.lName}
          onChange={handleChange}
          placeholder="e.g. Doe"
          autoComplete="on"
        />
        <p className="form-error">{errorValues.lName}</p>
        <label htmlFor="phone" className="form-label">
          Phone Number<span className="required-field">*</span>
        </label>
        <input
          type="text"
          id="phone"
          className="form-input"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="e.g. 3456789"
          autoComplete="on"
        />
        <p className="form-error">{errorValues.phone}</p>
        <label htmlFor="email" className="form-label">
          Email Address<span className="required-field">*</span>
        </label>
        <input
          type="email"
          id="email"
          className="form-input"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="e.g. john.doe@domain.com"
          autoComplete="on"
        />
        <p className="form-required-notice">
          (Required in order to receive email confirmation)
        </p>
        <p className="form-error">{errorValues.email}</p>
        <label htmlFor="promo" className="form-label">
          Promo Code
        </label>
        <input
          type="text"
          id="promo"
          className="form-input"
          name="promo"
          value={formData.promo}
          onChange={handleChange}
        />
        <p className="form-error">{errorValues.promo}</p>
        <label htmlFor="dropdown" className="form-label">
          How did you hear about us?
          {(formData.promo === "" || errorValues.promo !== "") && (
            <span className="required-field">*</span>
          )}
        </label>
        <select
          id="dropdown"
          className="form-input"
          name="dropdown"
          value={formData.dropdown}
          onChange={handleChange}
        >
          <option value="">Select...</option>
          <option value="media">Social Media</option>
          <option value="friend">From a friend</option>
          <option value="email">Email</option>
          <option value="other">Other</option>
        </select>
        <p className="form-error">{errorValues.dropdown}</p>
        {formData.dropdown === "other" && (
          <div className="optional-input-container">
            <label htmlFor="specifyOther" className="form-label">
              Please Specify<span className="required-field">*</span>
            </label>
            <input
              type="text"
              id="specifyOther"
              className="form-input"
              name="specifyOther"
              value={formData.specifyOther}
              onChange={handleChange}
            />
            <p className="form-error">{errorValues.specifyOther}</p>
          </div>
        )}
        <label htmlFor="agree" className="form-label">
          <input
            type="checkbox"
            id="agree"
            className="form-input"
            name="agree"
            checked={formData.agree}
            onChange={handleChange}
          />
          I agree to the terms and conditions of this event.
          <span className="required-field">*</span>
        </label>
        <p className="form-error">{errorValues.agree}</p>
      </div>
    </section>
  );
}

export default Form;
