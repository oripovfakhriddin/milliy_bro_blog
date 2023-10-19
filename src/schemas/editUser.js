import * as yup from "yup";

const editUserSchema = yup.object().shape({
  first_name: yup.string().required("Please enter your first name"),
  last_name: yup.string().required("Please enter your last name"),
  username: yup.string().required("Please enter a new username"),
  address: yup.string(),
  birthday: yup.string(),
  email: yup.string().email(),
  info: yup.string(),
  phoneNumber: yup.string(),
});

export default editUserSchema;