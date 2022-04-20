import "../CSS/Login.css";
import { useState } from "react";
import { useAuth } from "../CPA";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const { doLogin } = useAuth();
  const navigate = useNavigate();

  const [iU, ciU] = useState("");
  const [iP, ciP] = useState("");

  const handleLogin = () => {
    doLogin();
    navigate("/home");
  };

  return (
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
    </div>
  );
};
