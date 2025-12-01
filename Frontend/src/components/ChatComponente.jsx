import React, { useState, useEffect, useRef } from "react";
import { useUsuario } from "../context/UsuarioContext"; // Importamos el contexto de usuario
import api from "../services/api"; // Tu conexión con Spring Boot
import "./ChatComponente.css";

function ChatComponente({ ordenId, estadoOrden }) {
  const { usuario } = useUsuario(); // Obtenemos quién está logueado
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef(null); // Referencia para el auto-scroll
  const chatContainerRef = useRef(null);

  const chatBloqueado = estadoOrden === "CANCELADO";

  // 1. Función para cargar mensajes del Backend
  const cargarMensajes = async () => {
    if (!ordenId || !usuario) return;
    try {
      const response = await api.get(`/chat/${ordenId}`);
      setMessages(response.data);
    } catch (error) {
      console.error("Error cargando mensajes:", error);
    }
  };

  // 2. Efecto de Polling: Carga mensajes cada 3 segundos
  useEffect(() => {
    cargarMensajes(); // Carga inicial
    
    // Intervalo para buscar mensajes nuevos (Polling)
    const intervalo = setInterval(() => {
      cargarMensajes();
    }, 3000); 

    // Limpieza al salir del componente
    return () => clearInterval(intervalo);
  }, [ordenId, usuario]);

  // 3. Efecto para bajar el scroll automáticamente
  useEffect(() => {
    const container = chatContainerRef.current;
    if (container) {
      const isNearBottom = container.scrollHeight - container.scrollTop - container.clientHight < 150;

      if (isNearBottom) {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth"});
      }
    } else {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // 4. Enviar Mensaje (POST)
  const handleSendMessage = async () => {
    if (chatBloqueado) return;

    if (!inputValue.trim() || !usuario || !ordenId) return;

    const contenidoMensaje = inputValue;
    setInputValue(""); // Limpiamos input visualmente rápido

    try {
      // DTO que espera tu ChatController Java
      const payload = {
        ordenId: Number(ordenId),
        remitenteId: usuario.id,
        contenido: contenidoMensaje
      };

      await api.post('/chat', payload);
      
      // Recargamos mensajes inmediatamente para ver el nuestro
      cargarMensajes();
    } catch (error) {
      console.error("Error enviando mensaje:", error);
      alert("No se pudo enviar el mensaje.");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Función auxiliar para formatear la hora que viene de Java (ej: 2025-11-30T10:30:00)
  const formatTime = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleTimeString("es-ES", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Si no hay orden seleccionada (Caso Admin inicial)
  if (!ordenId) {
     return <div className="text-center p-5 text-muted">Selecciona un chat para comenzar.</div>;
  }

  return (
    <div
      className="mx-3 rounded-3 d-flex flex-column colorVerdeOscuro"
      style={{ height: "500px", width: "45rem", backgroundColor: "#fff", border: "1px solid #ddd" }}
    >
      {/* Header del Chat */}
      <div className="text-white p-3 border-bottom d-flex justify-content-between align-items-center" style={{ backgroundColor: "#198754" }}>
        <div className="d-flex align-items-center gap-3">
           {/* Avatar genérico */}
          <img
            src="https://static.vecteezy.com/system/resources/previews/037/282/413/non_2x/user-icon-vector.jpg"
            alt="Avatar"
            className="rounded-circle bg-white"
            style={{ width: "40px", height: "40px", objectFit: "cover", padding: "2px" }}
          />
          <div>
            <h5 className="mb-0">Chat de Orden #{ordenId}</h5>
            <small className="text-white-50">Conexión Segura</small>
          </div>
        </div>
      </div>

      {/* Área de Mensajes */}
      <div
        ref={chatContainerRef}
        className="chat-messages flex-grow-1 overflow-y-auto p-3"
        style={{ backgroundColor: "#f9f9f9" }}
      >
        {messages.map((message) => {
            // LÓGICA CRÍTICA:
            // Comparamos el ID del remitente del mensaje con TU ID de usuario.
            // Si son iguales, el mensaje es tuyo (derecha/verde).
            // Nota: message.remitente viene de Java como objeto completo.
            const esMio = message.remitente?.id === usuario.id;

            return (
              <div
                key={message.id}
                className={`d-flex mb-3 ${
                  esMio ? "justify-content-end" : "justify-content-start"
                }`}
              >
                <div
                  className={`p-2 rounded-3 shadow-sm ${
                    esMio
                      ? "colorVerdeClaro text-white" // Tuyo
                      : "bg-white text-dark border"  // Del otro
                  }`}
                  style={{ maxWidth: "70%" }}
                >
                  <p className="mb-1">{message.contenido}</p>
                  <small
                    className={`d-block text-end ${
                      esMio ? "text-white-50" : "text-muted"
                    }`}
                    style={{ fontSize: "0.7rem" }}
                  >
                    {formatTime(message.fechaEnvio)}
                  </small>
                </div>
              </div>
            );
        })}
        {/* Elemento invisible para scrollear al final */}
        <div ref={messagesEndRef} />
      </div>

      {/* Input de Mensaje */}
      <div className="p-3 border-top bg-white rounded-bottom">
        <div
          className="input-group"
          style={{ backgroundColor: "#f5f5f5", border: "1px solid #e0e0e0", borderRadius: "8px" }}
        >
          <textarea
            className="form-control border-0 bg-transparent"
            placeholder={chatBloqueado ? "No puedes enviar mensajes en una orden cancelada." : "Escribe un mensaje..."}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            rows="1"
            disabled={chatBloqueado}
            style={{ resize: "none", boxShadow: "none" }}
          />
          <button
            className="btn text-success"
            type="button"
            onClick={handleSendMessage}
            title="Enviar"
            style={{ borderLeft: "1px solid #e0e0e0" }}
          >
            <i className="bi bi-send-fill fs-5"></i>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatComponente;