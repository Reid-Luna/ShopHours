import "../CSS/Login.css";
import { useState } from "react";
import { useAPI } from "../CPA";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
  const { doSignUp } = useAPI();
  const navigate = useNavigate();

  const [iU, ciU] = useState("");
  const [iP, ciP] = useState("");
  const [iRP, ciRP] = useState("");

  const [e, sE] = useState([]);

  const handleSignUp = () => {
    if (iP !== iRP) return sE([...e, "passwords do not match"]);
    doSignUp(iU, iP);
    navigate("/login");
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
        <input
          type="password"
          value={iRP}
          onChange={(e) => ciRP(e.target.value)}
          placeholder="Repeat Password"
        />

        <div className="error">
          {e.map((e) => (
            <div>{e}</div>
          ))}
        </div>

        <input onClick={handleSignUp} type="submit" value="Sign Up" />
      </div>
      <div className="switch" onClick={() => navigate("/login")}>
        Login
      </div>
    </div>
  );
};
