import pty from "node-pty";

export function Terminal(io) {
  io.on("connection", socket => {
    console.log("[terminal] connected:", socket.id);

    const shell = "bash";

    const ptyProcess = pty.spawn(shell, ["--login", "-i"], {
      name: "xterm-256color",
      cols: 80,
      rows: 30,
      cwd: process.cwd(), // NOT INIT_CWD
      env: {
        ...process.env,
        TERM: "xterm-256color",
      },
    });

    // PTY → client
    ptyProcess.onData(data => {
      socket.emit("terminal:data", data);
    });

    // client → PTY
    socket.on("terminal:write", data => {
      ptyProcess.write(data);
    });

    socket.on("disconnect", () => {
      ptyProcess.kill();
      console.log("[terminal] disconnected:", socket.id);
    });

    // optional resize
    socket.on("terminal:resize", ({ cols, rows }) => {
      ptyProcess.resize(cols, rows);
    });
  });
}
