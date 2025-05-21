import { Outlet, Link } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow-md p-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-blue-600">
          StudySync
        </Link>
        <div className="space-x-4">
          <Link to="/" className="text-gray-700 hover:text-blue-600">
            Home
          </Link>
          <Link to="/login" className="text-gray-700 hover:text-blue-600">
            Log In
          </Link>
          <Link to="/profile" className="text-blue-600">
            My Profile
          </Link>
        </div>
      </nav>

      {/* Page Content */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-white text-center py-4 shadow-2xl">
        <p className="text-sm text-gray-500">
          &copy; 2025 StudySync. All Rights Reserved.
        </p>
      </footer>
    </div>
  );
};

export default MainLayout;
