import React, { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
import "./Livechat.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaperclip,
  faSmile,
  faUserTie,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import { faFacebookMessenger } from "@fortawesome/free-brands-svg-icons";

const socket = io("http://localhost:5000", {
  withCredentials: true,
});

export default function Livechat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const roomId = useRef(localStorage.getItem("roomId") || "");

  useEffect(() => {
    // Nếu chưa có roomId thì tạo mới và lưu
    if (!roomId.current) {
      roomId.current = `room_${Date.now()}`;
      localStorage.setItem("roomId", roomId.current);
    }

    socket.emit("createRoom", roomId.current);

    socket.on("receiveMessage", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    socket.on("chatEnded", () => {
      setMessages((prev) => [
        ...prev,
        { sender: "admin", text: "Cuộc trò chuyện đã kết thúc." },
      ]);
    });

    return () => {
      socket.off("receiveMessage");
      socket.off("chatEnded");
    };
  }, []);

  function toggleChat() {
    setIsOpen((prev) => !prev);
  }

  // Thêm timestamp khi gửi tin nhắn
  function handleSendMessage() {
    if (currentMessage.trim()) {
      const msg = {
        sender: "user",
        text: currentMessage,
        timestamp: Date.now(),
      };

      setMessages((prev) => [...prev, msg]);
      socket.emit("sendMessage", {
        roomId: roomId.current,
        message: currentMessage, // Gửi dạng string
      });
      setCurrentMessage("");
    }
  }

  return (
    <div className="livechat">
      <div className="chat-toggle-button" onClick={toggleChat}>
        <FontAwesomeIcon
          icon={faFacebookMessenger}
          size="2x"
          color={isOpen ? "#333" : "#007bff"}
        />
      </div>

      <div
        className={`chat-box ${
          isOpen ? "animate-chat-open" : "animate-chat-close"
        }`}
      >
        {isOpen && (
          <>
            <div className="head-chat d-flex justify-content-between align-items-center">
              <h6 className="m-0">Customer Support</h6>
              <p className="m-0 text-muted bg-light">Let's Chat App</p>
            </div>

            <div className="body-chat">
              <p className="adim-text-chat">
                <FontAwesomeIcon icon={faUserTie} /> Chào bạn. Mình có thể giúp
                gì cho bạn?
              </p>
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={
                    msg.sender === "user" ? "user-message" : "admin-message"
                  }
                >
                  {msg.text}
                </div>
              ))}
            </div>

            <div className="footer-chat d-flex align-items-center">
              <FontAwesomeIcon icon={faUserTie} />
              <input
                type="text"
                className="chat-input"
                placeholder="Enter Message!"
                value={currentMessage}
                onChange={(e) => setCurrentMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              />
              <button className="icon-button">
                <FontAwesomeIcon icon={faSmile} />
              </button>
              <button className="icon-button">
                <FontAwesomeIcon icon={faPaperclip} />
              </button>
              <button className="send-button" onClick={handleSendMessage}>
                <FontAwesomeIcon icon={faPaperPlane} />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
