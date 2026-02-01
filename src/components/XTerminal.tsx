import { useEffect, useRef } from "react";
import { Terminal } from "xterm";
import { FitAddon } from "xterm-addon-fit";
import "xterm/css/xterm.css";
import { Resizable } from "re-resizable";
import { useSocket } from '../context/SocketContext';

const TERMINAL_THEME = {
    background: "#19191a", // Transparent for glass effect
    foreground: "#e5e7eb",
    cursor: "#e5e7eb",
    selection: "#374151",
    allowTransparency: true,
};

export default function TerminalComponent() {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const terminalRef = useRef<Terminal | null>(null);
    const { socket } = useSocket();
    const fitAddonRef = useRef<FitAddon | null>(null);

    useEffect(() => {
        if (!containerRef.current || !socket) return;

        // 1. Create terminal
        const terminal = new Terminal({
            theme: TERMINAL_THEME,
            fontFamily: "JetBrains Mono, monospace",
            fontSize: 15,
            cursorBlink: true,
            scrollback: 2000,
            convertEol: true,
            allowTransparency: true,

        });

        // 2. Load resize addon
        const fitAddon = new FitAddon();
        terminal.loadAddon(fitAddon);
        fitAddonRef.current = fitAddon;

        // 3. Attach terminal to DOM
        terminal.open(containerRef.current);

        // Initial fit
        setTimeout(() => fitAddon.fit(), 50);

        // 5. Server → Terminal
        const onTerminalData = (data: string) => {
            terminal.write(data);
        };
        socket.on("terminal:data", onTerminalData);

        // 6. Terminal → Server
        terminal.onData((data) => {
            socket.emit("terminal:write", data);
        });

        // Save refs
        terminalRef.current = terminal;

        // 7. Cleanup
        return () => {
            socket.off("terminal:data", onTerminalData);
            terminal.dispose();
        };
    }, [socket]);

    // Handle resize with throttling for smoothness
    const resizeTimeoutRef = useRef<number | null>(null);

    const handleResize = () => {
        if (resizeTimeoutRef.current) return;

        resizeTimeoutRef.current = requestAnimationFrame(() => {
            if (fitAddonRef.current) {
                try {
                    fitAddonRef.current.fit();
                } catch (e) {
                    // Ignore resize errors during rapid movement
                }
            }
            resizeTimeoutRef.current = null;
        });
    };
    return (
        <Resizable
            className="relatz-20z-20 border-t border-purple-500/30 hover:border-purple-500/80 transition-colors duration-300 bg-[#19191a] backdrop-blur-md shadow-[0_-5px_30px_rgba(189,0,255,0.15)] flex flex-col"
            defaultSize={{ width: "100%", height: "30%" }}
            minHeight="10%"
            maxHeight="90%"
            enable={{
                top: true,
                right: false,
                bottom: false,
                left: false,
                topRight: false,
                bottomRight: false,
                bottomLeft: false,
                topLeft: false,
            }}
            onResizeStop={handleResize}
            onResize={handleResize}
        >
            {/* Drag Handle Indicator */}
            <div className="w-full flex justify-center py-2 cursor-row-resize hover:bg-purple-500/10 transition-colors">
                <div className="w-16 h-1 bg-purple-500/50 rounded-full" />
            </div>

            <div
                ref={containerRef}
                style={{
                    flex: 1,
                    width: "100%",
                    padding: "0 16px 16px 16px",
                    overflow: "hidden"
                }}
            />
        </Resizable>
    );
}
