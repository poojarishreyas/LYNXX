import http from "http";
import express from "express";
import { Server as SocketServer } from "socket.io";
import { Terminal } from "./terminal.js";
import { FileExplorer } from "./fileexplorer.js";
import {watchDirectory} from "./watcher.js";
import dotenv from "dotenv";
import fs from "fs";
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

  socket.on("file:read", ({id,name}) => {
  try{
    const content=fs.readFileSync(id, "utf-8");
    socket.emit("file:content",  {name:name, content:content} );
  }
  catch(error){
    socket.emit("file:error", {path:id, error:"Could not read file"});
  }

});
});



const watcher = watchDirectory(projectDir, (change) => {
  // Broadcast file changes to all connected clients
  io.emit("fileChange", change);
});

server.listen(9000, () => {
  console.log("Backend running on port 9000");
});