import { useState } from "react";
import "./Chatbot.css";

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hi 👋 Welcome to Shoe Mart! How can I help you?",
    },
  ]);

  const sendMessage = () => {
    if (message.trim() === "") return;

    const userMessage = message.toLowerCase();

    setMessages((prev) => [
      ...prev,
      {
        sender: "user",
        text: message,
      },
    ]);

    let botReply =
      "Sorry 😅 I didn't understand. You can ask me about shoes, products, cart, wishlist or orders.";

    if (
      userMessage.includes("shoe") ||
      userMessage.includes("product")
    ) {
      botReply =
        "👟 We have Men's Shoes and Women's Shoes. Go to Products to explore them!";
    } else if (userMessage.includes("cart")) {
      botReply =
        "🛒 You can see your selected shoes in the Cart section.";
    } else if (userMessage.includes("wishlist")) {
      botReply =
        "❤️ You can save your favourite shoes in the Wishlist.";
    } else if (userMessage.includes("order")) {
      botReply =
        "📦 You can check your order details after completing checkout.";
    } else if (
      userMessage.includes("hello") ||
      userMessage.includes("hi")
    ) {
      botReply =
        "Hello 👋 How can I help you with your Shoe Mart shopping?";
    }

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: botReply,
        },
      ]);
    }, 500);

    setMessage("");
  };

  return (
    <>
      <button
        className="chatbot-button"
        onClick={() => setIsOpen(!isOpen)}
      >
        💬
      </button>

      {isOpen && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <span>👟 Shoe Mart Chat</span>

            <button onClick={() => setIsOpen(false)}>
              ✖
            </button>
          </div>

          <div className="chatbot-messages">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={
                  msg.sender === "user"
                    ? "user-message"
                    : "bot-message"
                }
              >
                {msg.text}
              </div>
            ))}
          </div>

          <div className="chatbot-input">
            <input
              type="text"
              placeholder="Ask something..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  sendMessage();
                }
              }}
            />

            <button onClick={sendMessage}>➤</button>
          </div>
        </div>
      )}
    </>
  );
}

export default Chatbot;