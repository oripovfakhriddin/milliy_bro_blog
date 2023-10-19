import "./Footer.scss";

import face from "../../../assets/footer/facebook.svg";
import twit from "../../../assets/footer/twitter.svg";
import insta from "../../../assets/footer/instagram.svg";
import linked from "../../../assets/footer/linkedIn.svg";

import home from "../../../assets/footer/home.png"
import blog from "../../../assets/footer/blog.png"
import about from "../../../assets/footer/about.png"
import register from "../../../assets/footer/register.png"
import login from "../../../assets/footer/login.png"
import { NavLink } from "react-router-dom";


const Footer = () => {
  return (
    <footer>
      <div className="container foot-text">
        <div>
          <h5>MilliyBro 10 Chilanzar</h5>
          <h5>shohrux-rustamov@mail.ru +998 90 496 90 07</h5>
        </div>
        <div className="footer-image">
          <img src={face} alt="facebook" />
          <img src={twit} alt="twitter" />
          <img src={insta} alt="instagram" />
          <img src={linked} alt="linkedIn" />
        </div>
      </div>
    <div className="headfoot">
      <div className="container headercha">
        <NavLink className="headercha-link" to="/"><img src={home} alt="" />Home </NavLink>
        <NavLink className="headercha-link" to="/blog"><img src={blog} alt="" />Blog</NavLink>
        <NavLink className="headercha-link" to="/about"><img src={about} alt="" />About</NavLink>
        <NavLink className="headercha-link" to="/register"><img src={register} alt="" />Register</NavLink>
        <NavLink className="headercha-link" to="/login"><img src={login} alt="" />Login</NavLink>
      </div>
    </div>
    </footer>
  );
};

export default Footer;
