import "../CSS/Login.css";
import { useState } from "react";
import { useAPI } from "../CPA";
import { useNavigate, Navigate } from "react-router-dom";

export const Login = () => {
  const { doLogin, bear } = useAPI();
  const navigate = useNavigate();

  const [iU, ciU] = useState("");
  const [iP, ciP] = useState("");

  const handleLogin = () => {
    doLogin(iU, iP);
    navigate("/");
  };

  return !bear ? (
    <div className="Login">
      <div className="Form">
        <input
          type="text"
          value={iU}
          onChange={(e) => ciU(e.target.value)}
          placeholder="Username"
        />
        <input
          type="password"
          value={iP}
          onChange={(e) => ciP(e.target.value)}
          placeholder="Password"
        />

        <input onClick={handleLogin} type="submit" value="Login" />
      </div>
      <div className="switch" onClick={() => navigate("/signup")}>
        Sign Up
      </div>
    </div>
  ) : (
    <Navigate to="/" replace />
  );
};
