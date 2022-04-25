import { createContext, useContext, useState } from "react";
import a from "axios";

const SignUp = (u, p) =>
  new Promise(async (r, j) => {
    try {
      const { data } = await a.post("http://localhost:6969/user/signup", {
        username: u,
        password: p,
      });
      r(data.user);
    } catch (e) {
      j(e);
      console.log(e.response);
    }
  });

const Login = (u, p) =>
  new Promise(async (r, j) => {
    try {
      const { data } = await a.post("http://localhost:6969/user/login", {
        username: u,
        password: p,
      });
      r(data.token);
    } catch (e) {
      j(e);
      console.log(e);
    }
  });

const Logout = () => new Promise((r, j) => r("done"));

const GetCurrentOrders = () =>
  new Promise((r, j) =>
    a
      .get(`http://localhost:6969/orders/current`)
      .then((d) => r(d.data))
      .catch((e) => j(e))
  );

const Search = (term) =>
  new Promise((r, j) =>
    a
      .get(`http://localhost:6969/search/${term}`)
      .then((d) => r(d.data))
      .catch((e) => j(e))
  );

const DefaultContext = {
  bear: null,
  user: null,
  doLogin: null,
  doLogout: null,
  doSignUp: null,
  searchResults: null,
  doSearch: null,
  ordersInProgress: null,
  getOrders: null,
};

export const APIContext = createContext(DefaultContext);

export const APIProvider = ({ children }) => {
  const [br, sBr] = useState(null);
  const [us, sUs] = useState(null);
  const [sRes, cSRes] = useState(null);
  const [cOrders, sCOrders] = useState(null);

  const doSignUp = async (username, password) => {
    console.log("signup");
    const user = await SignUp(username, password);
    sUs(user);
    console.log(user);
  };

  const doLogin = async (username, password) => {
    console.log("login");
    const bear = await Login(username, password);
    sBr(bear);
    a.defaults.headers.Authorization = `Bearer ${bear}`;
    console.log(bear);
  };

  const doLogout = async () => {
    await Logout();
    sBr(DefaultContext);
  };

  const doSearch = async (term) => {
    console.log("search");
    const results = await Search(term);
    cSRes(results);
  };

  const getOrders = async () => {
    const results = await GetCurrentOrders();
    sCOrders(results);
  };

  const value = {
    bear: br,
    user: us,
    doLogin,
    doLogout,
    doSignUp,
    searchResults: sRes,
    doSearch,
    ordersInProgress: cOrders,
    getOrders,
  };

  return <APIContext.Provider value={value}>{children}</APIContext.Provider>;
};

export const useAPI = () => useContext(APIContext);
