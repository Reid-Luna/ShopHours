import { createContext, useContext, useState } from "react";
import a from "axios";

const Login = (u, p) =>
  new Promise(async (r, j) => {
    try {
      const { token } = await a.post("http://localhost:6969/user/login", {
        body: { username: u, password: p },
      }).data;
      r(token);
    } catch (e) {
      j(e);
    }
  });
const Logout = () => new Promise((r, j) => r("done"));

const DefaultContext = {
  bear: null,
  doLogin: null,
  doLogout: null,
};

export const AuthContext = createContext(DefaultContext);

export const AuthProvider = ({ children }) => {
  const [br, sBr] = useState(null);

  const doLogin = async (username, password) => {
    console.log("login");
    const bear = await Login(username, password);
    sBr(bear);
    console.log(bear);
  };

  const doLogout = async () => {
    await Logout();
    sBr(DefaultContext);
  };

  const value = {
    bear: br,
    doLogin,
    doLogout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
