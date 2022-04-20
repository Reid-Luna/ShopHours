import "./CSS/App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login, Home } from "./Pages";
import { AuthProvider, useAuth, SearchProvider } from "./CPA";
import { ProtectedRoute } from "./Utils";

const App = () => {
  const { bear } = useAuth();
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <SearchProvider>
                  <Home />
                </SearchProvider>
              </ProtectedRoute>
            }
          />
          <Route index element={<Login />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
