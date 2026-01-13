import http from "http";                               // HTTP server
import express from "express";                         // Express framework
import { Server as SocketServer } from "socket.io";    // Socket.IO server
import pty from "node-pty";                            // PTY module for shell emulation


// Spawn a bash terminal process (PTY)
const ptyProcess = pty.spawn("bash", [], {
    name: "xterm-color",                               // Terminal type
    cols: 80,                                          // Default columns
    rows: 30,                                          // Default rows
    cwd: process.env.INIT_CWD,                         // Working directory
    env: process.env                                  // Inherit environment variables
});


const app = express();                                 // Create Express application instance

const server = http.createServer(app);                 // Bind Express to an HTTP server

const io = new SocketServer(server, {                  // Create Socket.IO server
    cors: "*"                                          // Allow all origins (development convenience)
});


// PTY -> Socket.IO (send terminal output to client)
ptyProcess.onData(data => {
    io.emit("terminal:data", data);
});


// Socket.IO -> PTY (write client input into terminal)
io.on("connection", socket => {
    console.log("Socket connected:", socket.id);

    socket.on("terminal:write", data => {
        ptyProcess.write(data);
    });

    // Optional: Resize event (if needed later)
    // socket.on("terminal:resize", ({ cols, rows }) => {
    //     ptyProcess.resize(cols, rows);
    // });
});


// Start server
server.listen(9000, () => {
    console.log("🐋 Docker server running on port 9000");
});
