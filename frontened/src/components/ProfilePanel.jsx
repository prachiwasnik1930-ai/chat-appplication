import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ProfilePanel({ isOpen, onClose, setIsAuthenticated }) {

  const navigate = useNavigate();

  const [name, setName] = useState("Praachi");
  const [bio, setBio] = useState("");
  const [status, setStatus] = useState("Available");
  const [email, setEmail] = useState("");

  // 🔥 FINAL LOGOUT
  const handleLogout = () => {
    localStorage.removeItem("token");   // clear token
    setIsAuthenticated(false);          // reset auth
    navigate("/");                      // go to login page
  };

  return (
    <div
      className={`fixed top-0 right-0 h-full w-80 bg-white dark:bg-gray-800 shadow-lg z-40 transform transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >

      {/* HEADER */}
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-lg font-bold">My Profile</h2>
        <button onClick={onClose} className="text-2xl">✖</button>
      </div>

      <div className="p-4 space-y-3">

        {/* PROFILE IMAGE */}
        <div className="flex flex-col items-center">
          <img
            src="https://i.pravatar.cc/150?img=12"
            alt="profile"
            className="w-20 h-20 rounded-full mb-2"
          />
          <button className="text-blue-500 text-sm">Change Photo</button>
        </div>

        {/* NAME */}
        <div>
          <label className="text-sm">Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border p-2 rounded mt-1"
          />
        </div>

        {/* BIO */}
        <div>
          <label className="text-sm">Bio</label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="w-full border p-2 rounded mt-1"
          />
        </div>

        {/* STATUS */}
        <div>
          <label className="text-sm">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full border p-2 rounded mt-1"
          >
            <option>Available</option>
            <option>Busy</option>
            <option>Away</option>
          </select>
        </div>

        {/* EMAIL */}
        <div>
          <label className="text-sm">Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border p-2 rounded mt-1"
          />
        </div>

        {/* SAVE */}
        <button className="bg-green-500 text-white w-full py-2 rounded mt-2">
          Save Changes
        </button>

        {/* LOGOUT */}
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white w-full py-2 rounded mt-2"
        >
          Logout
        </button>

      </div>
    </div>
  );
}

export default ProfilePanel;