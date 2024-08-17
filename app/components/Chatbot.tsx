"use client";

import { useState } from "react";

interface Message {
  role: "user" | "bot";
  content: string;
}

export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (input.trim() === "") return;

    const newMessages: Message[] = [
      ...messages,
      { role: "user", content: input },
    ];
    setMessages(newMessages);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: input }),
      });

      const data = await response.json();
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: "bot", content: data.response },
      ]);
    } catch (error) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: "bot", content: "Error occurred." },
      ]);
    }

    setInput("");
  };

  return (
    <div className="mx-auto p-4 bg-gray-100 rounded-lg shadow-md w-full h-[100vh]">
      <div className="mb-4 p-4 bg-black rounded-lg h-80 overflow-y-scroll">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-2 p-2 rounded-lg ${
              msg.role === "user"
                ? "bg-blue-500 text-white text-right"
                : "bg-green-500 text-white text-left"
            }`}
          >
            {msg.content}
          </div>
        ))}
      </div>
      <div className="flex">
        <input
          type="text"
          className="flex-grow p-2 border text-black border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Type your message..."
        />
        <button
          onClick={sendMessage}
          className="p-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600"
        >
          Send
        </button>
      </div>
    </div>
  );
}
