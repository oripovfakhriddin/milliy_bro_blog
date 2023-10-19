import * as yup from "yup";

const PostSchema = yup.object().shape({
  title: yup.string().required(),
  description: yup
    .string()
    .required()
    .min(5, `Password's minimal length must be 5`)
    .max(12, `Password's maximal length must be 12`),

});

export default PostSchema;
