import { useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

function Assistant() {
    const [provider, setProvider] = useState(null);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [messages, setMessages] = useState([]);

    const selectProvider = (selectedProvider) => {
        setProvider(selectedProvider);

        setMessages([
            {
                sender: "assistant",
                text:
                    selectedProvider === "gemini"
                        ? "Connected to **TizonaAI Security Assistant** using **Gemini**.\n\nAsk me about malware, phishing, IOC analysis, MITRE ATT&CK, investigations, or incident response."
                        : "Connected to **Ollama**.\n\nYour conversations stay on your local machine."
            }
        ]);
    };

    const sendMessage = async () => {
        if (!message.trim()) return;

        const userMessage = {
            sender: "user",
            text: message
        };

        setMessages((prev) => [...prev, userMessage]);

        setLoading(true);

        try {
            const response = await axios.post(
                "http://127.0.0.1:8000/api/assistant/chat",
                {
                    provider,
                    message
                }
            );

            setMessages((prev) => [
                ...prev,
                {
                    sender: "assistant",
                    text: response.data.answer
                }
            ]);
        } catch (error) {
            setMessages((prev) => [
                ...prev,
                {
                    sender: "assistant",
                    text: "❌ Unable to contact the AI Assistant."
                }
            ]);
        }

        setLoading(false);
        setMessage("");
    };

    if (!provider) {
        return (
            <div className="page-container">
                <h1>🤖 AI Security Assistant</h1>

                <p className="page-subtitle">
                    Choose your AI engine
                </p>

                <div className="provider-container">

                    <div className="provider-card">
                        <h2>☁️ Gemini</h2>

                        <p>
                            Cloud AI • Fast • Strong reasoning
                        </p>

                        <p>
                            ✓ Online AI<br />
                            ✓ Great for investigations<br />
                            ✓ No local hardware required
                        </p>

                        <button
                            className="send-button"
                            onClick={() => selectProvider("gemini")}
                        >
                            Use Gemini
                        </button>
                    </div>

                    <div className="provider-card">
                        <h2>💻 Ollama</h2>

                        <p>
                            Local AI • Offline • Private
                        </p>

                        <p>
                            ✓ No API cost<br />
                            ✓ Data stays local<br />
                            ✓ Llama 3 / Qwen / Mistral
                        </p>

                        <button
                            className="send-button"
                            onClick={() => selectProvider("ollama")}
                        >
                            Use Ollama
                        </button>
                    </div>

                </div>
            </div>
        );
    }

    return (
        <div className="page-container">

            <h1>🤖 AI Security Assistant</h1>

            <p className="page-subtitle">
                Current Provider:
                {provider === "gemini"
                    ? " ☁️ Gemini"
                    : " 💻 Ollama"}
            </p>

            <button
                className="send-button"
                onClick={() => setProvider(null)}
            >
                Switch AI
            </button>

            <div className="chat-container">

                {messages.map((msg, index) => (

                    <div
                        key={index}
                        className={
                            msg.sender === "user"
                                ? "message user-message"
                                : "message assistant-message"
                        }
                    >
                        <strong>
                            {msg.sender === "user"
                                ? "You"
                                : "Assistant"}
                        </strong>

                        <br />

                        {msg.sender === "assistant" ? (
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                {msg.text}
                            </ReactMarkdown>
                        ) : (
                            <span>{msg.text}</span>
                        )}

                    </div>

                ))}

                {loading && (
                    <div className="message assistant-message">
                        <strong>Assistant</strong>

                        <br />

                        Thinking...
                    </div>
                )}

            </div>

            <div className="chat-input-row">

                <input
                    className="chat-input"
                    type="text"
                    placeholder="Ask about phishing, malware, IOC analysis..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            sendMessage();
                        }
                    }}
                />

                <button
                    className="send-button"
                    onClick={sendMessage}
                >
                    Send
                </button>

            </div>

        </div>
    );
}

export default Assistant;
