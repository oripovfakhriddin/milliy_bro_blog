import * as yup from "yup";

const passwordSchema = yup.object().shape({
  currentPassword: yup.string().min(3, `Password's minimal length must be 3`),
  newPassword: yup.string().min(3, `Password's minimal length must be 3`),
  confirmPassword: yup.string().required("Please confirm your password"),
});

export default passwordSchema;
