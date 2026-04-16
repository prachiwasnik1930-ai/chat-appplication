import { useEffect, useRef } from "react";

function Messages({ messages, isTyping }) {

  const bottomRef = useRef(null);

  // 🔥 AUTO SCROLL TO LATEST MESSAGE
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  return (
    <div className="flex-1 p-4 overflow-y-auto bg-gray-100 dark:bg-gray-900">

      {/* ❌ NO MESSAGES */}
      {messages.length === 0 && (
        <p className="text-center text-gray-500 mt-10">
          Start conversation 🚀
        </p>
      )}

      {/* 💬 MESSAGE LIST */}
      {messages.map((msg, index) => (
        <div
          key={index}
          className={`flex mb-2 ${
            msg.sender === "me" ? "justify-end" : "justify-start"
          }`}
        >
          <div
            className={`max-w-xs p-3 rounded-lg shadow ${
              msg.sender === "me"
                ? "bg-blue-500 text-white"
                : "bg-white dark:bg-gray-700 text-black dark:text-white"
            }`}
          >
            <div>{msg.text}</div>

            {/* 🕒 TIME */}
            <div className="text-xs mt-1 text-right opacity-70">
              {msg.time}
            </div>
          </div>
        </div>
      ))}

      {/* ✍️ TYPING INDICATOR */}
      {isTyping && (
        <div className="flex justify-start mb-2">
          <div className="bg-white dark:bg-gray-700 px-3 py-2 rounded-lg text-sm text-gray-500">
            Typing...
          </div>
        </div>
      )}

      {/* 🔽 AUTO SCROLL TARGET */}
      <div ref={bottomRef}></div>

    </div>
  );
}

export default Messages;