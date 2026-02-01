import Editor from "@monaco-editor/react";
import { useSocket } from "../context/SocketContext";
import { useEffect, useState } from "react";

const CodeEditor = ({
  selectedNode,
  openedtabs,
  setOpenedtabs,
  activetab,
  setActivetab
}) => {
  const { socket } = useSocket();
  const [content, setContent] = useState("");

  // 🎨 Monaco theme
  const handleBeforeMount = monaco => {
    monaco.editor.defineTheme("custom-dark", {
      base: "vs-dark",
      inherit: true,
      rules: [],
      colors: {
        "editor.background": "#0F0F0F"
      }
    });
  };

  // 🧠 Language detection
  const getLanguage = path => {
    const ext = path?.split(".").pop()?.toLowerCase();
    switch (ext) {
      case "js":
      case "jsx":
        return "javascript";
      case "ts":
      case "tsx":
        return "typescript";
      case "json":
        return "json";
      case "html":
        return "html";
      case "css":
        return "css";
      case "md":
        return "markdown";
      case "py":
        return "python";
      default:
        return "javascript";
    }
  };

  // 🔌 Socket listener (ONCE)
  useEffect(() => {
    if (!socket) return;

    const handleFileContent = ({ name, content }) => {
      setOpenedtabs(prev => {
        const existing = prev.find(t => t.name === name);

        if (existing) {
          setContent(existing.content);
          setActivetab(name);
          return prev;
        }

        const newTabs = [...prev, { name, content }];
        setContent(content);
        setActivetab(name);
        return newTabs;
      });
    };

    socket.on("file:content", handleFileContent);
    return () => socket.off("file:content", handleFileContent);
  }, [socket, setOpenedtabs, setActivetab]);

  // 📤 Request file when selection changes
  useEffect(() => {
    if (!socket || !selectedNode?.isLeaf) return;

    socket.emit("file:read", {
      id: selectedNode.id,
      name: selectedNode.data.name
    });
  }, [socket, selectedNode]);

  // 🔄 Switch editor content when tab changes
  useEffect(() => {
    if (!activetab) return;

    const tab = openedtabs.find(t => t.name === activetab);
    if (tab) setContent(tab.content);
  }, [activetab, openedtabs]);

  // 🖼️ Empty state
  if ((!selectedNode || !selectedNode.isLeaf ) && openedtabs.length === 0) {
    return (
      <div className="h-full w-full flex flex-col items-center justify-center bg-[#0F0F0F]">
        <img
          src="/editorlynx.png"
          alt="Lynx"
          className="w-[70%] h-[70%] object-contain opacity-20"
        />
        <p className="text-gray-500 mt-4">Select a file to start editing</p>
      </div>
    );
  }

  return (
    <Editor
      height="100%"
      width="100%"
      theme="custom-dark"
      beforeMount={handleBeforeMount}
      language={getLanguage(activetab)}
      value={content}
      options={{
        fontSize: 14,
        minimap: { enabled: false },
        automaticLayout: true
      }}
    />
  );
};

export default CodeEditor;
