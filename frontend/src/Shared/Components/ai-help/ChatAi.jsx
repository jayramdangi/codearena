import React, { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import axiosClient from "../../../services/api/axiosClient";
import { Send } from "lucide-react";
import plantumlEncoder from "plantuml-encoder";

const MAX_WORDS_PER_MESSAGE = 1000;

// Helper to detect if text is PlantUML
const isPlantUML = (text) => {
  return text?.trim().startsWith("@startuml");
};

// Helper to count words
const countWords = (text) => {
  if (!text) return 0;
  return text.trim().split(/\s+/).length;
};

// Component to render PlantUML as image
const PlantUMLImage = ({ code }) => {
  const [error, setError] = useState(false);

  const encoded = plantumlEncoder.encode(code);
  const url = `https://www.plantuml.com/plantuml/img/${encoded}`;

  if (error) {
    return (
      <div className="text-red-400 text-sm">
        Failed to load diagram.
      </div>
    );
  }

  return (
    <img
      src={url}
      alt="Idea Map Diagram"
      className="max-w-full h-auto border border-gray-700 rounded"
      onError={() => setError(true)}
    />
  );
};

function ChatAi({ problem, codeOfEditor }) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, reset, watch } = useForm();
  const messagesContainerRef = useRef(null);
  const messagesRef = useRef(messages);

  const watchedMessage = watch("message", "");
  const wordCount = countWords(watchedMessage);
  const isTooLong = wordCount > MAX_WORDS_PER_MESSAGE;

  // Keep ref in sync
  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  // Auto-scroll
  useEffect(() => {
    const el = messagesContainerRef.current;
    if (!el) return;
    requestAnimationFrame(() => {
      el.scrollTop = el.scrollHeight;
    });
  }, [messages, loading]);

  // 🔥 INITIAL FETCH FROM BACKEND
  useEffect(() => {
    if (!problem?._id) return;

    const fetchChats = async () => {
      try {
        setLoading(true);

        const response = await axiosClient.get("/ai/myChats", {
          params: { problemId: problem._id },
        });

        const backendMessages = response?.data?.messages || [];
        setMessages(backendMessages);
      } catch (error) {
        console.error("Failed to fetch chats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchChats();
  }, [problem?._id]);

  const buttonActions = [
    { label: "Explain Problem", endpoint: "/ai/explainProblem" },
    { label: "Explain Solution", endpoint: "/ai/explainSolution" },
    { label: "Hint", endpoint: "/ai/hint" },
    { label: "Edge Cases", endpoint: "/ai/edgeCases" },
    { label: "Give Solution", endpoint: "/ai/solution" },
    { label: "Idea Map", endpoint: "/ai/ideaMap" },
    { label: "Analyze Complexity" },
    { label: "Fix My Code" },
  ];

  const sendChatMessage = async (userText) => {
    if (!userText || loading) return;

    const userMsg = {
      role: "user",
      parts: [{ text: userText }],
    };

    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);

    try {
      // Send only last 10 messages
      const lastMessages = messagesRef.current
        .slice(-9)
        .concat(userMsg);

      const response = await axiosClient.post("/ai/chat", {
        messages: lastMessages,
        title: problem?.title,
        description: problem?.description,
        testCases: problem?.visibleTestCases,
        startCode: problem?.startCode?.[0]?.initialCode || "",
      });

      const reply =
        response?.data?.message || "No reply from AI.";

      setMessages((prev) => [
        ...prev,
        { role: "model", parts: [{ text: reply }] },
      ]);
    } catch (error) {
      console.error("API Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "model",
          parts: [
            {
              text:
                "Sorry, I'm having trouble connecting. Please try again.",
            },
          ],
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleButtonClick = async (btn) => {
    if (loading) return;

    if (
      btn.label === "Analyze Complexity" ||
      btn.label === "Fix My Code"
    ) {
      const userText = `${btn.label}:\n\n${codeOfEditor}`;
      await sendChatMessage(userText);
      return;
    }

    const userMsg = {
      role: "user",
      parts: [{ text: btn.label }],
    };

    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);

    try {
      const response = await axiosClient.post(btn.endpoint, {
        title: problem?.title,
        problemId: problem?._id,
        description: problem?.description,
        testCases: problem?.visibleTestCases,
        startCode: problem?.startCode?.[0]?.initialCode || "",
      });

      const reply =
        response?.data?.message || "No reply from AI.";

      setMessages((prev) => [
        ...prev,
        { role: "model", parts: [{ text: reply }] },
      ]);
    } catch (error) {
      console.error("API Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "model",
          parts: [
            {
              text:
                "Sorry, I'm having trouble connecting. Please try again.",
            },
          ],
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data) => {
    if (isTooLong) return;
    const userText = String(data.message ?? "").trim();
    await sendChatMessage(userText);
    reset();
  };

  const renderMessageContent = (text) => {
    if (isPlantUML(text)) {
      return <PlantUMLImage code={text} />;
    }
    return <div className="whitespace-pre-wrap">{text}</div>;
  };

  return (
    <div className="flex flex-col h-[400px] bg-gray-900 rounded-lg border border-amber-500/30">
      <div
        ref={messagesContainerRef}
        className="flex-1 overflow-y-auto p-3 space-y-3"
      >
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.role === "user"
                ? "justify-end"
                : "justify-start"
            }`}
          >
            <div
              className={`max-w-[80%] rounded-lg px-3 py-2 text-sm ${
                msg.role === "user"
                  ? "bg-amber-500 text-gray-900 font-medium"
                  : "bg-gray-800 text-gray-100 border border-gray-700"
              }`}
            >
              {renderMessageContent(
                msg.parts?.[0]?.text ?? ""
              )}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="bg-gray-800 text-gray-100 px-3 py-2 rounded-lg text-sm">
              Thinking...
            </div>
          </div>
        )}
      </div>

      <div className="px-3 pt-2 pb-1 bg-gray-800 border-t border-gray-700 flex flex-wrap gap-2">
        {buttonActions.map((btn) => (
          <button
            key={btn.label}
            onClick={() => handleButtonClick(btn)}
            disabled={loading}
            className="px-3 py-1 text-xs font-medium bg-gray-700 text-gray-200 rounded-md hover:bg-amber-500 hover:text-gray-900 disabled:opacity-50"
          >
            {btn.label}
          </button>
        ))}
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-3 bg-gray-800 border-t border-gray-700"
      >
        <div className="flex items-center space-x-2">
          <input
            placeholder="Ask me anything about the problem..."
            className="flex-1 px-3 py-2 bg-gray-700 text-gray-100 border border-gray-600 rounded-lg text-sm"
            {...register("message", { required: true })}
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading || isTooLong}
            className="p-2 bg-amber-500 text-gray-900 rounded-lg hover:bg-amber-400 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send size={16} />
          </button>
        </div>

        {isTooLong && (
          <div className="mt-1 text-xs text-red-400">
            Message too long ({wordCount} words). Max allowed is{" "}
            {MAX_WORDS_PER_MESSAGE}.
          </div>
        )}
      </form>
    </div>
  );
}

export default ChatAi;