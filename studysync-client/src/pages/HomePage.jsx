import { Link } from "react-router-dom";
import { BookOpenCheck, Rocket } from "lucide-react";

const HomePage = () => {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center px-4">
      <div className="max-w-4xl w-full bg-white shadow-xl rounded-2xl p-10 text-center space-y-6">
        {/* Logo or Icon */}
        <div className="flex justify-center">
          <Rocket className="w-16 h-16 text-blue-600" />
        </div>

        {/* Heading */}
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-800">
          Welcome to <span className="text-blue-600">StudySync</span>
        </h1>

        {/* Sub-heading */}
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Your personal note management platform for oraganizing, editing, and
          syncing your study materials - Anytime, Anywhere!
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4">
          <Link
            to="/login"
            className="bg-blue-600 text-white px-6 py-3 rounded-full shadow hover:bg-blue-700 transition"
          >
            Log In
          </Link>
          <Link
            to="/register"
            className="border border-blue-600 text-blue-600 px-6 py-3 rounded-full shadow hover:bg-blue-50 transition"
          >
            Register
          </Link>
        </div>

        {/* Optional feature icons */}
        <div className="pt-8 border-t border-gray-200 grid grid-cols-1 sm:grid-cols-3 gap-6 text-gray-500 text-sm">
          <div className="flex flex-col items-center">
            <BookOpenCheck className="w-6 h-6 mb-1 text-blue-500" />
            Easy CRUD for Notes
          </div>
          <div className="flex flex-col items-center">
            <Rocket className="w-6 h-6 mb-1 text-green-500" />
            Fast & Lightweight
          </div>
          <div className="flex flex-col items-center">
            <Rocket className="w-6 h-6 mb-1 text-purple-500" />
            Mobile-friendly UI
          </div>
        </div>
      </div>
    </main>
  );
};

export default HomePage;
