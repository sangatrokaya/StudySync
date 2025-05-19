import { Route, Routes, Navigate } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/Loginpage";
import MainLayout from "./layouts/MainLayout";
import DashboardPage from "./pages/DashboardPage";
import { Toaster } from "react-hot-toast";

const App = () => {
  // Check token once at the top for conditional redirect
  const token = localStorage.getItem("token");

  return (
    <>
      <Toaster position="top-center" />
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          {/* Redirect to dashboard or login based on token */}
          <Route
            index
            element={
              token ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <DashboardPage />
              </PrivateRoute>
            }
          />
        </Route>
      </Routes>
    </>
  );
};

export default App;
