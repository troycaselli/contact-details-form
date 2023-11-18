import React from "react";
import "./form.css";

function Form() {
  return (
    <section className="form-wrapper">
      <div className="form-container">
        <h1>Contact Details</h1>
        <label htmlFor="fName">First Name:</label>
        <input type="text" id="fName" name="fName" />
        <label htmlFor="lName">Last Name:</label>
        <input type="text" id="lName" name="lName" />
        <label htmlFor="phone">Phone Number:</label>
        <input type="text" id="phone" name="phone" />
        <label htmlFor="email">Email Address:</label>
        <input type="email" id="email" name="email" />
        <label htmlFor="promo">Promo Code:</label>
        <input type="text" id="promo" name="promo" />
        <label htmlFor="dropdown">How did you hear about us?</label>
        <select id="dropdown">
          <option value="">Select...</option>
          <option value="media">Social Media</option>
          <option value="friend">From a friend</option>
          <option value="email">Email</option>
          <option value="other">Other</option>
        </select>
        <label htmlFor="specifyOther">Please Specify:</label>
        <input type="text" id="specifyOther" name="specifyOther" />
        <label htmlFor="agree">
          <input type="checkbox" name="agree" />I agree to the terms and
          conditions of this event.
        </label>
      </div>
    </section>
  );
}

export default Form;
