import { useState, useEffect, useRef } from "react";
import * as yup from "yup";
import schema from "../validation/formSchema";

function useFormLogic() {
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

  // initialize state
  const [formData, setFormData] = useState(initialFormData);
  const [errorValues, setErrorValues] = useState(initialErrorValues);
  const [disabled, setDisabled] = useState(true);
  const [showPopup, setShowPopup] = useState(false);

  const popupRef = useRef(null);

  // update error values by checking form values with schema
  const validate = (name, valueToUse) => {
    yup
      .reach(schema, name)
      .validate(valueToUse)
      .then(() => {
        setErrorValues((prevErrorValues) => ({
          ...prevErrorValues,
          [name]: "",
        }));
      })
      .catch((err) =>
        setErrorValues((prevErrorValues) => ({
          ...prevErrorValues,
          [name]: err.errors[0],
        }))
      );
  };

  // update form data state
  const handleChange = (evt) => {
    const { type, name, value, checked } = evt.target;
    const valueToUse = type === "checkbox" ? checked : value;
    setFormData({ ...formData, [name]: valueToUse });
    validate(name, valueToUse);
  };

  // clear specifyOther value if dropdown value !== other
  useEffect(() => {
    if (formData.dropdown !== "other") {
      setFormData((prevFormData) => ({ ...prevFormData, specifyOther: "" }));
    }
  }, [formData.dropdown]);

  // check form data with yup schema
  useEffect(() => {
    schema.isValid(formData).then((valid) => {
      setDisabled(!valid);
    });
  }, [formData]);

  // toggle terms and conditions popup
  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  // hide terms and conditions popup when clicking outside the box.
  const handleClickOutside = (evt) => {
    if (popupRef.current && !popupRef.current.contains(evt.target)) {
      setShowPopup(false);
    }
  };

  return {
    formData,
    errorValues,
    disabled,
    showPopup,
    popupRef,
    handleChange,
    togglePopup,
    handleClickOutside,
  };
}

export default useFormLogic;
