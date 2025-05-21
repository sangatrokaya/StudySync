import { useEffect, useState } from "react";
import axios from "../axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { UserCircle2 } from "lucide-react";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // send token in Authorization header
        const res = await axios.get("/users/profile");
        setUser(res.data); /* Set user state with response */
      } catch (error) {
        console.error("Failed to fetch profile!", error);
        toast.error("Failed to fetch profile!");
        navigate("/login");
      }
    };
    fetchProfile();
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-200">
      <div className="w-full max-w-md text-center mx-auto bg-white rounded-2xl shadow-xl p-8">
        <div className="flex flex-col items-center mb-6">
          <UserCircle2 className="w-20 h-20 text-indigo-500" />
          <h2 className="text-3xl font-semibold mt-4 text-gray-800">Profile</h2>
          <p className="text-gray-500">Your account details</p>
        </div>
        {user ? (
          <div className="text-left space-y-4">
            <div>
              <p className="text-sm text-gray-500">User ID</p>
              <p className="font-medium text-gray-700">{user._id}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Username</p>
              <p className="font-medium text-gray-700">{user.username}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-medium text-gray-700">{user.email}</p>
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-500">Loading Profile...</p>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
