import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { useContext } from "react";
import "./style.scss";
import { AuthContext } from "../../../context/AuthContext";
import request from "../../../server";
import registerSchema from "../../../schemas/register";
import Cookies from "js-cookie";
import { ROLE, TOKEN } from "../../../const";

const RegisterPage = () => {
  const { setSavedUsername } = useContext(AuthContext);
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      username: "",
      password: "",
      confirm: "",
    },
    validationSchema: registerSchema,
    onSubmit: async (values) => {
      try {
        if (values.password === values.confirm) {
          const {data: { token, role }} = await request.post(`/auth/register`, values);
          if (role === "user") {
            navigate("/my-posts");
          } else {
            navigate("/dashboard");
          }
          Cookies.set(TOKEN, token);
          localStorage.setItem(ROLE, role);
          toast.success("You are registrated !");
          setSavedUsername(values.first_name);
          navigate("/login");
        } else {
          toast.error("Please confirm your password");
        }
      } catch (err) {
        toast.error(err.response.data);
      }
    },
  });

  return (
    <section id="login-form">
      <div className="container">
        <h1 className="login__title">Register</h1>
        <form
          autoComplete="off"
          onSubmit={formik.handleSubmit}
          className="login-inputs"
        >
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.first_name}
            type="text"
            name="first_name"
            placeholder="First name"
            className="login-input"
          />
          {formik.touched.first_name && formik.errors.first_name ? (
            <p className="error-message">{formik.errors.first_name}</p>
          ) : null}
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.last_name}
            type="text"
            name="last_name"
            placeholder="Last name"
            className="login-input"
          />
          {formik.touched.last_name && formik.errors.last_name ? (
            <p className="error-message">{formik.errors.last_name}</p>
          ) : null}
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.username}
            required
            name="username"
            type="text"
            placeholder="Username"
            className="login-input"
          />
          {formik.touched.username && formik.errors.username ? (
            <p className="error-message">{formik.errors.username}</p>
          ) : null}

          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            required
            name="password"
            type="password"
            placeholder="Password"
            className="login-input"
          />
          {formik.touched.password && formik.errors.password ? (
            <p className="error-message">{formik.errors.password}</p>
          ) : null}
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.confirm}
            required
            name="confirm"
            type="password"
            placeholder="Confirm"
            className="login-input"
          />
          {formik.touched.confirm && formik.errors.confirm ? (
            <p className="error-message">{formik.errors.confirm}</p>
          ) : null}
          <input className="login-btn" type="submit" value="Register" onClick={()=> {}} />
        </form>
      </div>
    </section>
  );
};

export default RegisterPage;
