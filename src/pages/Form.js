import React, { useState, useEffect } from "react";

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

  // update form data state
  const handleChange = (evt) => {
    const { type, name, value, checked } = evt.target;
    const valueToUse = type === "checkbox" ? checked : value;
    setFormData({ ...formData, [name]: valueToUse });
  };

  // clear specifyOther value if dropdown value !== other
  useEffect(() => {
    if (formData.dropdown !== "other") {
      setFormData((prevFormData) => ({ ...prevFormData, specifyOther: "" }));
    }
  }, [formData.dropdown]);

  useEffect(() => {
    schema.isValid(formData).then((valid) => setDisabled(!valid));
  }, [formData]);

  return (
    <section className="form-wrapper">
      <div className="form-container">
        <div className="form-success-container">
          {!disabled && (
            <div className="form-success-card">
              <p className="form-success-text">
                You have filled in all the fields correctly.
              </p>
            </div>
          )}
        </div>
        <h1>Contact Details</h1>
        <label htmlFor="fName">
          First Name:<span className="required-field">*</span>
        </label>
        <input
          type="text"
          id="fName"
          name="fName"
          value={formData.fName}
          onChange={handleChange}
        />
        <label htmlFor="lName">
          Last Name:<span className="required-field">*</span>
        </label>
        <input
          type="text"
          id="lName"
          name="lName"
          value={formData.lName}
          onChange={handleChange}
        />
        <label htmlFor="phone">
          Phone Number:<span className="required-field">*</span>
        </label>
        <input
          type="text"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
        />
        <label htmlFor="email">
          Email Address:<span className="required-field">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        <p>This field is required in order to receive an email confirmation</p>
        <label htmlFor="promo">Promo Code:</label>
        <input
          type="text"
          id="promo"
          name="promo"
          value={formData.promo}
          onChange={handleChange}
        />
        <label htmlFor="dropdown">How did you hear about us?</label>
        <select
          id="dropdown"
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
        {formData.dropdown === "other" && (
          <div>
            <label htmlFor="specifyOther">
              Please Specify:<span className="required-field">*</span>
            </label>
            <input
              type="text"
              id="specifyOther"
              name="specifyOther"
              value={formData.specifyOther}
              onChange={handleChange}
            />
          </div>
        )}
        <label htmlFor="agree">
          <input
            type="checkbox"
            name="agree"
            checked={formData.agree}
            onChange={handleChange}
          />
          I agree to the terms and conditions of this event.
          <span className="required-field">*</span>
        </label>
      </div>
    </section>
  );
}

export default Form;
