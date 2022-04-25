import "./CSS/App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login, Home, Signup } from "./Pages";
import { APIProvider, useAPI } from "./CPA";
import { ProtectedRoute } from "./Utils";

const App = () => {
  const { bear } = useAPI();
  return (
    <Router>
      <APIProvider>
        <Routes>
          <Route
            path="/"
            index
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route path="/order/*" element={<></>} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </APIProvider>
    </Router>
  );
};

export default App;
