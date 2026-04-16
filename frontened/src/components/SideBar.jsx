function Sidebar({ chats = {}, selectedUser, handleUserClick }) {

  const safeChats = chats || {};

  return (
    <div className="w-64 bg-gradient-to-b from-purple-700 to-indigo-900 text-white p-4 overflow-y-auto">

      <h2 className="text-xl font-bold mb-4">
        Chit-Chat 💬
      </h2>

      <input
        type="text"
        placeholder="Search..."
        className="mb-4 p-2 rounded bg-white text-black w-full"
      />

      {Object.keys(safeChats).length === 0 ? (
        <p>No users</p>
      ) : (
        Object.keys(safeChats).map((user) => (
          <div
            key={user}
            onClick={() => handleUserClick(user)}
            className={`p-3 mb-2 rounded cursor-pointer flex items-center gap-3 ${
              selectedUser === user
                ? "bg-green-500"
                : "hover:bg-purple-600"
            }`}
          >

            {/* 🔥 AVATAR */}
            <div className="relative">
              <img
                src={safeChats[user]?.avatar}
                alt="avatar"
                className="w-10 h-10 rounded-full object-cover"
              />

              {/* 🟢 ONLINE DOT */}
              <span className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
                safeChats[user]?.online ? "bg-green-400" : "bg-gray-400"
              }`}></span>
            </div>

            {/* 👤 USER INFO */}
            <div>
              <div className="font-semibold">{user}</div>
              <div className="text-sm text-gray-200">
                {safeChats[user]?.online ? "Online" : "Offline"}
              </div>
            </div>

          </div>
        ))
      )}

    </div>
  );
}

export default Sidebar;