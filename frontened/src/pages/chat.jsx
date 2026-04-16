import { useState } from "react";
import Sidebar from "../components/SideBar";
import Messages from "../components/Messages";
import MessageInput from "../components/MessageInput";
import ChatHeader from "../components/ChatHeader";
import ProfilePanel from "../components/ProfilePanel";
import useChat from "../hooks/useChat";

function Chat({ setIsAuthenticated }) {

  const {
    chats,
    selectedUser,
    input,
    setInput,
    sendMessage,
    isTyping,
    handleUserClick
  } = useChat();

  const [showProfile, setShowProfile] = useState(false);

  return (
    <div className="flex h-screen">

      {/* SIDEBAR */}
      <Sidebar
        chats={chats}
        selectedUser={selectedUser}
        handleUserClick={handleUserClick}
      />

      {/* CHAT AREA */}
      <div className="flex flex-col flex-1">

        <ChatHeader
          user={selectedUser}
          onProfileClick={() => setShowProfile(true)}
        />

        <Messages
          messages={chats[selectedUser]?.messages || []}
          isTyping={isTyping}
        />

        <MessageInput
          input={input}
          setInput={setInput}
          sendMessage={sendMessage}
        />

      </div>

      {/* PROFILE PANEL */}
      <ProfilePanel
        isOpen={showProfile}
        onClose={() => setShowProfile(false)}
        setIsAuthenticated={setIsAuthenticated}   // 🔥 IMPORTANT
      />

    </div>
  );
}

export default Chat;