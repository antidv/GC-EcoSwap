import { useState } from "react";
import "./ChatComponente.css";

function ChatComponente() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "other",
      text: "Hola, buenas tardes",
      timestamp: "10:30",
    },
    {
      id: 2,
      sender: "user",
      text: "Hola, ¿tienes disponible el producto?",
      timestamp: "10:31",
    },
    {
      id: 3,
      sender: "other",
      text: "Claro, ¿dónde nos encontramos?",
      timestamp: "10:32",
    },
  ]);
  const [inputValue, setInputValue] = useState("");

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      const newMessage = {
        id: messages.length + 1,
        sender: "user",
        text: inputValue,
        timestamp: new Date().toLocaleTimeString("es-ES", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages([...messages, newMessage]);
      setInputValue("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div
      className="mx-3 rounded-3 d-flex flex-column colorVerdeOscuro"
      style={{ height: "500px", width: "45rem" ,backgroundColor: "#fff" }}
    >
      {/* Header del Chat */}
      <div className="text-white p-3 border-bottom d-flex justify-content-between align-items-center" style={{backgroundColor:"#198754"}}>
        <div className="d-flex align-items-center gap-3">
          <img
            src="https://static.vecteezy.com/system/resources/previews/037/282/413/non_2x/user-icon-vector.jpg"
            alt="Avatar"
            className="rounded-circle"
            style={{ width: "40px", height: "40px", objectFit: "cover" }}
          />
          <div>
            <h5 className="mb-0">Juan Pérez</h5>
            <small className="text-white-50">En línea</small>
          </div>
        </div>
      </div>

      {/* Área de Mensajes */}
      <div
        className="chat-messages flex-grow-1 overflow-y-auto p-3"
        style={{ backgroundColor: "#f9f9f9" }}
      >
        {messages.map((message) => (
          <div
            key={message.id}
            className={`d-flex mb-3 ${
              message.sender === "user"
                ? "justify-content-end"
                : "justify-content-start"
            }`}
          >
            <div
              className={`p-2 rounded-3 ${
                message.sender === "user"
                  ? "colorVerdeClaro text-white border border-black"
                  : "bg-light text-dark border border-black"
              }`}
              style={{ maxWidth: "70%" }}
            >
              <p className="mb-1">{message.text}</p>
              <small
                className={
                  message.sender === "user" ? "text-white-50" : "text-muted"
                }
              >
                {message.timestamp}
              </small>
            </div>
          </div>
        ))}
      </div>

      {/* Input de Mensaje */}
      <div className="p-3 border-top">
        <div
          className="input-group colorVerdeOscuro"
          style={{ backgroundColor: "#f5f5f5", border: "1px solid #e0e0e0" }}
        >
          <textarea
            className="form-control"
            placeholder="Escribe un mensaje..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            rows="1"
            style={{ backgroundColor: "transparent", maxWidth:"60rem", resize:"none"}}
          />
          <button
            className="btn colorBlue"
            type="button"
            onClick={handleSendMessage}
            title="Enviar"
          >
            <i className="bi bi-send-fill"></i>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatComponente;
