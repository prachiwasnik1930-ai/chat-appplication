import { useState } from "react";

function MessageInput({ input, setInput, sendMessage }) {

  const [showEmoji, setShowEmoji] = useState(false);
  const [fileName, setFileName] = useState("");

  const emojis = ["😀", "😂", "😍", "😎", "😭", "🔥", "👍"];

  const handleSend = () => {
    if (!input.trim()) return;
    sendMessage();
    setFileName("");
  };

  // ✅ FIXED (safe state update)
  const handleEmojiClick = (emoji) => {
    setInput((prev) => prev + emoji);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setFileName(file.name);
  };

  // ✅ FIXED ENTER KEY
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="p-3 bg-white border-t dark:bg-gray-800 relative">

      {/* 📎 FILE NAME */}
      {fileName && (
        <div className="text-sm text-gray-600 dark:text-gray-300 mb-1">
          📎 {fileName}
        </div>
      )}

      <div className="flex items-center gap-2">

        {/* 😀 EMOJI BUTTON */}
        <button
          onClick={() => setShowEmoji(!showEmoji)}
          className="text-xl"
        >
          😄
        </button>

        {/* 📎 FILE UPLOAD */}
        <label className="cursor-pointer text-xl">
          📎
          <input
            type="file"
            className="hidden"
            onChange={handleFileUpload}
          />
        </label>

        {/* 📝 INPUT */}
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a message..."
          className="flex-1 border p-2 rounded dark:bg-gray-700 dark:text-white outline-none"
        />

        {/* 📤 SEND BUTTON */}
        <button
          onClick={handleSend}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Send
        </button>

      </div>

      {/* 😀 EMOJI PICKER */}
      {showEmoji && (
        <div className="absolute bottom-14 left-2 bg-white dark:bg-gray-700 border p-2 rounded shadow flex gap-2 flex-wrap w-40 z-50">
          {emojis.map((emoji, index) => (
            <span
              key={index}
              className="cursor-pointer text-lg"
              onClick={() => handleEmojiClick(emoji)}
            >
              {emoji}
            </span>
          ))}
        </div>
      )}

    </div>
  );
}

export default MessageInput;