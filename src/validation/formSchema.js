import * as yup from "yup";

const formSchema = yup.object().shape({
  fName: yup
    .string()
    .trim()
    .max(30, "*First name must be no more than 30 characters")
    .required("*First name required"),

  lName: yup
    .string()
    .trim()
    .max(30, "*Last name must be no more than 30 characters")
    .required("*Last name required"),

  phone: yup
    .string()
    .trim()
    .matches(/^[0-9]*$/, "*Phone number only accepts numbers 0-9")
    .max(30, "*Phone number must be no more than 30 characters")
    .required("*Phone number required"),

  email: yup
    .string()
    .trim()
    .email("*Must be a valid email")
    .max(50, "*Email must be no more than 50 characters")
    .required("*Email required"),

  promo: yup
    .string()
    .trim()
    .matches(/^[a-zA-Z0-9]*$/, "*Promo code only accepts alphanumeric values")
    .max(7, "*Promo code must be no more than 7 characters"),

  dropdown: yup.string().when("promo", {
    is: (val) => val === "" || val === null || val === undefined,
    then: () =>
      yup
        .string()
        .oneOf(
          ["media", "friend", "email", "other"],
          "*This field is required when promo is empty"
        ),
    otherwise: () => yup.string(),
  }),

  specifyOther: yup.string().when("dropdown", {
    is: (val) => val === "other",
    then: () =>
      yup
        .string()
        .trim()
        .max(255, "*This field must be no more than 255 characters")
        .required("*This field is required when 'Other' is selected"),
    otherwise: () =>
      yup.string().max(255, "*This field must be no more than 255 characters"),
  }),

  agree: yup.boolean().oneOf([true], "*You must agree to our terms"),
});

export default formSchema;
