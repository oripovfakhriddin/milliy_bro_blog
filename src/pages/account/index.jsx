import Cookies from "js-cookie";
import { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { IMG, ROLE, TOKEN } from "../../const";
import { AuthContext } from "../../context/AuthContext";
import "./style.scss";

import request from "../../server";

const AccountPage = () => {
  const navigate = useNavigate();
  const { setIsAuthenticated, setRole } = useContext(AuthContext);
  const [account, setAccount] = useState(null);

  const logout = () => {
    Cookies.remove(TOKEN);
    localStorage.removeItem(ROLE);
    setIsAuthenticated(false);
    setRole(null);
    navigate("/");
  };
  const getUser = async () => {
    const { data } = await request.get("auth/me");
    setAccount(data);
  };
  useEffect(()=>{
    getUser()
  }, [])
  

  return (
    <section id="account-form">
      <div className="container account">
        <div className="title-account">
          <h1 className="login__title">Account</h1>
          <NavLink className="account-btncha" to="/account/edit" >Edit Data</NavLink>
        </div>
        <div className="account-info">
          <div>
            <img src={account?.photo ? `${IMG}${account?.photo}` : null} alt="" />
            <button className="account-btn" onClick={logout}>
              Logout
            </button>
          </div>
          <div className="account-text">
            <h3>
              First Name: <span>{account?.first_name}</span>
            </h3>
            <h3>
              Last Name: <span>{account?.last_name}</span>
            </h3>
            <h3>
              Username: <span>{account?.username}</span>
            </h3>
            <h3>
              Phone Number: <span>{account?.phoneNumber}</span>
            </h3>
            <h3>
              Birthday Date: <span>{account?.birthday?.split('T')[0]}</span>
            </h3>
            <h3>
              Address: <span>{account?.address}</span>
            </h3>
            <h3>
              Email: <span>{account?.email}</span>
            </h3>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AccountPage;
