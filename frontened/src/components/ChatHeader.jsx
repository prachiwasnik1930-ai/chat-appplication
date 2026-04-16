function ChatHeader({ user, onProfileClick }) {
  return (
    <div className="flex justify-between items-center p-4 bg-gray-800 text-white">

      {/* LEFT SIDE - USER INFO */}
      <div>
        <h2 className="text-lg font-semibold">
          {user || "Select a user"}
        </h2>
        <p className="text-sm text-gray-300">
          {user ? "Online" : "Offline"}
        </p>
      </div>

      {/* RIGHT SIDE - ACTION BUTTONS */}
      <div className="flex items-center gap-3">

        {/* DARK MODE BUTTON (optional UI) */}
        <button className="bg-gray-700 px-3 py-1 rounded hover:bg-gray-600">
          🌙
        </button>

        {/* PROFILE BUTTON */}
        <button
          onClick={onProfileClick}   // ✅ FIXED
          className="bg-blue-500 px-3 py-1 rounded hover:bg-blue-600"
        >
          Profile
        </button>

      </div>

    </div>
  );
}

export default ChatHeader;