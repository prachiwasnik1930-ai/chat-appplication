import { useState, useEffect } from "react";
import socket from "../socket";

function useChat() {

  const currentUser = "Praachi";

  const [selectedUser, setSelectedUser] = useState("");
  const [chats, setChats] = useState({});
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  // 🔥 FETCH USERS
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("https://chat-appplication-production.up.railway.app/api/auth/users");
        const data = await res.json();

        const formatted = {};

        data.forEach((user) => {
          if (user.name !== currentUser) {
            formatted[user.name] = {
              online: Math.random() > 0.5,
              avatar: "https://i.pravatar.cc/150?img=" + Math.floor(Math.random() * 70),
              unread: 0,
              messages: []
            };
          }
        });

        setChats(formatted);

        // 🔥 SET DEFAULT USER + FETCH MESSAGES (FIX)
        if (data.length > 1) {
          const firstUser = data.find(u => u.name !== currentUser);

          if (firstUser) {
            setSelectedUser(firstUser.name);

            // ✅ IMPORTANT FIX
            fetchMessages(firstUser.name);
          }
        }

      } catch (err) {
        console.log(err);
      }
    };

    fetchUsers();
  }, []);

  // 🔥 FETCH MESSAGES FROM DB
  const fetchMessages = async (user) => {
    try {
      const res = await fetch(
         `https://chat-appplication-production.up.railway.app/api/messages?sender=${currentUser}&receiver=${user}`
      );

      const data = await res.json();

      setChats((prev) => ({
        ...prev,
        [user]: {
          ...prev[user],
          messages: data.map((msg) => ({
            text: msg.text,
            sender: msg.sender === currentUser ? "me" : "other",
            time: new Date(msg.createdAt).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit"
            })
          }))
        }
      }));

    } catch (err) {
      console.log(err);
    }
  };

  // 🔥 AUTO FETCH WHEN USER CHANGES
  useEffect(() => {
    if (selectedUser) {
      fetchMessages(selectedUser);
    }
  }, [selectedUser]);

  // 🔥 USER CLICK
  const handleUserClick = (user) => {
    setSelectedUser(user);
  };

  // 🔥 REAL-TIME LISTENER
  useEffect(() => {
    socket.on("receive_message", (data) => {

      if (data.sender === selectedUser) {
        setChats((prev) => ({
          ...prev,
          [data.sender]: {
            ...prev[data.sender],
            messages: [
              ...(prev[data.sender]?.messages || []),
              {
                text: data.text,
                sender: "other",
                time: new Date().toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit"
                })
              }
            ]
          }
        }));
      }

    });

    return () => socket.off("receive_message");
  }, [selectedUser]);

  // 🔥 SEND MESSAGE
  const sendMessage = async () => {
    if (!input.trim()) return;

    const messageData = {
      sender: currentUser,
      receiver: selectedUser,
      text: input
    };

    // SAVE TO DB
    await fetch("https://chat-appplication-production.up.railway.app/api/messages/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(messageData)
    });

    // REAL-TIME SEND
    socket.emit("send_message", messageData);

    // UPDATE UI
    setChats((prev) => ({
      ...prev,
      [selectedUser]: {
        ...prev[selectedUser],
        messages: [
          ...(prev[selectedUser]?.messages || []),
          {
            text: input,
            sender: "me",
            time: new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit"
            })
          }
        ]
      }
    }));

    setInput("");
  };

  return {
    chats,
    selectedUser,
    setSelectedUser,
    input,
    setInput,
    sendMessage,
    isTyping,
    handleUserClick
  };
}

export default useChat;