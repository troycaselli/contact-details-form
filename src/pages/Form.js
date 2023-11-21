import React from "react";
import useFormLogic from "./useFormLogic";
import "./form.css";

function Form() {
  const {
    formData,
    errorValues,
    disabled,
    showPopup,
    popupRef,
    handleChange,
    togglePopup,
    handleClickOutside,
  } = useFormLogic();

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

        {/* Input fields for First Name */}
        <label htmlFor="fName" className="form-label">
          First Name<span className="required-field">*</span>
        </label>
        <input
          type="text"
          className="form-input"
          id="fName"
          name="fName"
          value={formData.fName}
          onChange={handleChange}
          placeholder="e.g. John"
          autoComplete="on"
        />
        <p className="form-error">{errorValues.fName}</p>

        {/* Input fields for Last Name */}
        <label htmlFor="lName" className="form-label">
          Last Name<span className="required-field">*</span>
        </label>
        <input
          type="text"
          className="form-input"
          id="lName"
          name="lName"
          value={formData.lName}
          onChange={handleChange}
          placeholder="e.g. Doe"
          autoComplete="on"
        />
        <p className="form-error">{errorValues.lName}</p>

        {/* Input fields for Phone Number */}
        <label htmlFor="phone" className="form-label">
          Phone Number<span className="required-field">*</span>
        </label>
        <input
          type="text"
          className="form-input"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="e.g. 3456789"
          autoComplete="on"
        />
        <p className="form-error">{errorValues.phone}</p>

        {/* Input fields for Email Address */}
        <label htmlFor="email" className="form-label">
          Email Address<span className="required-field">*</span>
        </label>
        <input
          type="email"
          className="form-input"
          id="email"
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

        {/* Input field for Promo Code */}
        <label htmlFor="promo" className="form-label">
          Promo Code
        </label>
        <input
          type="text"
          className="form-input"
          id="promo"
          name="promo"
          value={formData.promo}
          onChange={handleChange}
        />
        <p className="form-error">{errorValues.promo}</p>

        {/* Dropdown for How did you hear about us */}
        <label htmlFor="dropdown" className="form-label">
          How did you hear about us?
          {(formData.promo === "" || errorValues.promo !== "") && (
            <span className="required-field">*</span>
          )}
        </label>
        <select
          className="form-input"
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
        <p className="form-error">{errorValues.dropdown}</p>

        {/* SpecifyOther input when dropdown value is 'other' */}
        {formData.dropdown === "other" && (
          <div className="optional-input-container">
            <label htmlFor="specifyOther" className="form-label">
              Please Specify<span className="required-field">*</span>
            </label>
            <input
              type="text"
              className="form-input"
              id="specifyOther"
              name="specifyOther"
              value={formData.specifyOther}
              onChange={handleChange}
            />
            {formData.dropdown === "other" && formData.specifyOther === "" && (
              <p className="form-error">
                *This field is required when 'Other' is selected
              </p>
            )}
            <p className="form-error">{errorValues.specifyOther}</p>
          </div>
        )}

        {/* Checkbox for agreement */}
        <div className="checkbox-input-container">
          <label htmlFor="agree" className="form-label"></label>
          <input
            type="checkbox"
            className="form-input"
            id="agree"
            name="agree"
            checked={formData.agree}
            onChange={handleChange}
          />
          <p>
            I agree to the{" "}
            <span className="form-terms-link" onClick={togglePopup}>
              terms and conditions
            </span>{" "}
            of this event.
            <span className="required-field">*</span>
          </p>
        </div>
        <p className="form-error">{errorValues.agree}</p>
      </div>

      {/* Popup for terms and conditions */}
      {showPopup && (
        <div className="form-popup-wrapper" onClick={handleClickOutside}>
          <div className="form-popup-card" ref={popupRef}>
            <div className="form-close-container">
              <p className="popup-close" onClick={togglePopup}>
                &times;
              </p>
            </div>
            <p className="popup-text">Terms and Conditions:</p>
            <p className="popup-text">
              ○ All cancellation requests must be received by March 1, 2022.
            </p>
            <p className="popup-text">
              ○ All cancellation requests are subject to a $100 cancellation
              fee.
            </p>
            <p className="popup-text">
              ○ No one under the age of 16 will be allowed on the show floor.
            </p>
          </div>
        </div>
      )}
    </section>
  );
}

export default Form;
