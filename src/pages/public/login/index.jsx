import { useFormik } from "formik";
import Cookies from "js-cookie";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ROLE, TOKEN } from "../../../const";
import { AuthContext } from "../../../context/AuthContext";
import loginSchema from "../../../schemas/login";
import request from "../../../server";
import "./style.scss";
const LoginPage = () => {
  const { setSavedUsername } = useContext(AuthContext);
  const navigate = useNavigate();
  const { setIsAuthenticated, setRole, setPassword } = useContext(AuthContext);

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      try {
        const {
          data: { token, role },
        } = await request.post("auth/login", values);
        if (role === "user") {
          navigate("/my-posts");
        } else {
          navigate("/dashboard");
        }
        setIsAuthenticated(true);
        setRole(role);
        Cookies.set(TOKEN, token);
        localStorage.setItem(ROLE, role);
        
        request.defaults.headers.Authorization = `Bearer ${token}`;

        setSavedUsername(values.username);
        setPassword(values.password);

      } catch (err) {
        toast.error(err.response.data);
      }
    },
  });
  return (
    <section id="login">
      <div className="container">
        <form className="login-form" onSubmit={formik.handleSubmit}>
          <h1>Login</h1>
          <div className="login-inputs">
            <input
              className="login-input"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.username}
              autoComplete="off"
              name="username"
              type="text"
              placeholder="Username"
            />
            {formik.touched.username && formik.errors.username ? (
              <p className="error-message">{formik.errors.username}</p>
            ) : null}
            <input
              className="login-input"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              name="password"
              type="password"
              placeholder="Password"
            />
            {formik.touched.password && formik.errors.password ? (
              <p className="error-message">{formik.errors.password}</p>
            ) : null}
            <input className="login-btn" type="submit" value="login" />
          </div>
        </form>
      </div>
    </section>
  );
};

export default LoginPage;
