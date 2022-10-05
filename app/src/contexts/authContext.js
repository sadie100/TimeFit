import { useState, useEffect, createContext } from "react";
import axios from "axios";
import { Cookies } from "react-cookie";
import jwt_decode from "jwt-decode";
import { useLocation } from "react-router-dom";

export const AuthContext = createContext({
  accessToken: "",
  refreshToken: "",
  user: null,
  isLogin: false,
  handleLogout: () => {},
  checkToken: () => {},
});
const cookies = new Cookies();

const AuthContextProvider = (props) => {
  const [accessToken, setAccessToken] = useState("");
  const [refreshToken, setRefreshToken] = useState("");
  const [user, setUser] = useState(null);
  //const { pathname } = useLocation();

  const checkToken = () => {
    if (!!cookies.get("AccessToken")) {
      setAccessToken(cookies.get("AccessToken"));
      setRefreshToken(cookies.get("RefreshToken"));
      setUser(jwt_decode(cookies.get("AccessToken")));
    } else {
      setAccessToken("");
      setRefreshToken("");
      setUser(null);
    }
  };
  useEffect(() => {
    checkToken();
  }, [cookies.get("AccessToken")]);

  const handleLogout = () => {
    cookies.remove("AccessToken");
    cookies.remove("RefreshToken");
  };
  return (
    <AuthContext.Provider
      value={{
        accessToken,
        refreshToken,
        user,
        handleLogout,
        checkToken,
        isLogin: !!accessToken,
      }}
      {...props}
    ></AuthContext.Provider>
  );
};
export default AuthContextProvider;
