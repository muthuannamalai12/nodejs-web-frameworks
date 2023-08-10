import adapter from "@sveltejs/adapter-auto";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter(),
    vite: {
      plugins: [
        {
          name: "sveltekit-socket-io",
          configureServer(server) {
            const io = new Server(server.httpServer);

            io.on("connection", (socket) => {
              // Generate a random username and send it to the client to display it
              let username = `User ${Math.round(Math.random() * 999999)}`;
              socket.emit("name", username);

              // Receive incoming messages and broadcast them
              socket.on("message", (message) => {
                io.emit("message", {
                  from: username,
                  message: message,
                  time: new Date().toLocaleString(),
                });
              });
            });

            // Socket.IO stuff goes here

            console.log("SocketIO injected");
          },
        },
      ],
    },
  },
};

export default config;
