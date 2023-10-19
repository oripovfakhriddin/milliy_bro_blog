import * as yup from "yup";

const registerSchema = yup.object().shape({
  first_name: yup.string().required("Please enter your first name"),
  last_name: yup.string().required("Please enter your last name"),
  username: yup.string().required("Please enter a new username"),
  password: yup
    .string()
    .min(3, `Password's minimal length must be 3`),
  confirm: yup.string().required("Please confirm your password"),
});

export default registerSchema;