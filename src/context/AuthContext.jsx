import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import Cookies from "js-cookie";
import { ROLE, TOKEN } from "../const";
import request from "../server";


export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    Boolean(Cookies.get(TOKEN))
  );
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  const getUser = async () => {
    try {
      setLoading(true);
      let { data } = await request.get("auth/me");
      setUser(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    isAuthenticated && getUser();
  }, [isAuthenticated]);

  const [role, setRole] = useState(localStorage.getItem(ROLE));

  const state = {
    isAuthenticated,
    role,
    user,
    loading,
    setIsAuthenticated,
    setRole,
    getUser,
  };

  return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>;
};

AuthContextProvider.propTypes = {
  children: PropTypes.node,
};

export default AuthContextProvider;
