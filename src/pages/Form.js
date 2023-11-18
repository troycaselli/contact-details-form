import React, { useState, useEffect } from "react";
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

function Form() {
  // initialize slice of state for form data
  const [formData, setFormData] = useState(initialFormData);

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

  return (
    <section className="form-wrapper">
      <div className="form-container">
        <h1>Contact Details</h1>
        <label htmlFor="fName">First Name:</label>
        <input
          type="text"
          id="fName"
          name="fName"
          value={formData.fName}
          onChange={handleChange}
        />
        <label htmlFor="lName">Last Name:</label>
        <input
          type="text"
          id="lName"
          name="lName"
          value={formData.lName}
          onChange={handleChange}
        />
        <label htmlFor="phone">Phone Number:</label>
        <input
          type="text"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
        />
        <label htmlFor="email">Email Address:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
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
            <label htmlFor="specifyOther">Please Specify:</label>
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
        </label>
      </div>
    </section>
  );
}

export default Form;
