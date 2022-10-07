import { useState, useEffect, createContext } from "react";
import axios from "axios";
import { Cookies } from "react-cookie";
import jwt_decode from "jwt-decode";
import { useLocation } from "react-router-dom";
import { ROLE } from "constants/center";

export const AuthContext = createContext({
  accessToken: "",
  refreshToken: "",
  user: null,
  isLogin: false,
  handleLogout: () => {},
  checkToken: () => {},
  type: "",
});
const cookies = new Cookies();

const AuthContextProvider = (props) => {
  const [accessToken, setAccessToken] = useState("");
  const [refreshToken, setRefreshToken] = useState("");
  const [user, setUser] = useState(null);
  const [type, setType] = useState("user");
  //const { pathname } = useLocation();

  const checkToken = async () => {
    try {
      if (!!cookies.get("AccessToken")) {
        setAccessToken(cookies.get("AccessToken"));
        setRefreshToken(cookies.get("RefreshToken"));

        const tokenInfo = jwt_decode(cookies.get("AccessToken"));
        // setUser(tokenInfo);
        //유저정보 가져오기
        const { data: userInfo } = await axios.get("/user");
        setUser({ ...userInfo, ...tokenInfo });
      } else {
        setAccessToken("");
        setRefreshToken("");
        setUser(null);
      }
    } catch (e) {
      console.log(e);
      alert("유저 정보 조회 과정에서 에러가 발생했습니다.");
    }
  };

  const handleCheck = async () => {
    await checkToken();
  };

  useEffect(() => {
    handleCheck();
  }, [cookies.get("AccessToken")]);

  useEffect(() => {
    if (!user) {
      return setType("user");
    }
    if (user?.roles.includes(ROLE.center)) {
      setType("center");
    } else if (user.roles.includes(ROLE.user)) {
      setType("user");
    }
  }, [user]);

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
        type,
        handleLogout,
        handleCheck,
        isLogin: !!accessToken,
      }}
      {...props}
    ></AuthContext.Provider>
  );
};
export default AuthContextProvider;
