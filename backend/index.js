import http from "http";
import express from "express";
import { Server as SocketServer } from "socket.io";
import { Terminal } from "./terminal.js";
import { FileExplorer } from "./fileexplorer.js";
import {watchDirectory} from "./watcher.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();

const server = http.createServer(app);

const io = new SocketServer(server, {
  cors: "*"
});
const projectname="Lynx"// it is now hardcoded for instance
const projectDir=process.env.projectDir+"/"+projectname;
console.log(projectDir)

// terminal 
Terminal(io);

io.on("connection", socket => {
  socket.on("fileExplorer:get", (projectname) => {
    socket.emit("fileExplorer", FileExplorer(projectDir));
  });

  socket.on("fileExplorer:getChildren", (dir) => {
    socket.emit("fileExplorer:children", FileExplorer(dir) );
  });
});

const watcher = watchDirectory(projectDir, (change) => {
  // Broadcast file changes to all connected clients
  io.emit("fileChange", change);
});

server.listen(9000, () => {
  console.log("Backend running on port 9000");
});