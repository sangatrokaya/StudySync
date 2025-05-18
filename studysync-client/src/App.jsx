import { Route, Routes, BrowserRouter } from "react-router-dom";
import LoginPage from "./pages/Loginpage";
import RegisterPage from "./pages/RegisterPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="login" element={<LoginPage />} />
        {/* Later we will add /dashboard, /notes etc. */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
