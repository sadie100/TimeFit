import { useState, useEffect, createContext } from "react";
import axios from "axios";
import { Cookies } from "react-cookie";
import jwt_decode from "jwt-decode";
import { useLocation } from "react-router-dom";
import { ROLE } from "constants/center";
import useAxiosInterceptor from "hooks/useAxiosInterceptor";
import { useNavigate } from "react-router-dom";

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
  const instance = useAxiosInterceptor();
  const navigate = useNavigate();
  //const { pathname } = useLocation();

  const checkToken = async () => {
    try {
      if (!!cookies.get("AccessToken")) {
        setAccessToken(cookies.get("AccessToken"));
        setRefreshToken(cookies.get("RefreshToken"));

        const tokenInfo = jwt_decode(cookies.get("AccessToken"));
        // setUser(tokenInfo);
        //유저정보 가져오기
        const { data } = await axios.get("/user");
        if (!data) {
          return setUser(tokenInfo);
        }
        const { email, name, phoneNumber, gender, center } = data;
        setUser({ ...tokenInfo, email, name, phoneNumber, gender, center });
      } else {
        setAccessToken("");
        setRefreshToken("");
        setUser(null);
      }
    } catch (e) {
      console.log(e);
      alert("유효하지 않은 계정 정보입니다. 다시 로그인해 주세요.");
      cookies.remove("AccessToken");
      cookies.remove("RefreshToken");
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

  const handleLogout = async () => {
    if (!window.confirm("로그아웃 하시겠습니까?")) return;
    try {
      await instance.get("/signout");
      alert("로그아웃 완료되었습니다.");
      handleCheck();
      navigate("/");
    } catch (e) {
      console.log(e);
      alert("로그아웃 실패했습니다.");
    }
    // cookies.remove("AccessToken");
    // cookies.remove("RefreshToken");
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
