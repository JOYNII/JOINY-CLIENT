// mock-socket-server.js

const { createServer } = require("http");
const { Server } = require("socket.io");

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: "https://localhost:3000", // Allow connections from our Next.js app
    methods: ["GET", "POST"],
  },
});

const PORT = 3001;

io.on("connection", (socket) => {
  console.log(`[Socket.io] User connected: ${socket.id}`);

  // Listen for a user joining a party room
  socket.on("join_room", (partyId) => {
    socket.join(partyId);
    console.log(`[Socket.io] User ${socket.id} joined room: ${partyId}`);
  });

  // Listen for a new message
  socket.on("send_message", (data) => {
    const { partyId, message } = data;
    // Broadcast the message to everyone in the same party room
    io.to(partyId).emit("receive_message", message);
    console.log(`[Socket.io] Message received in room ${partyId}:`, message);
  });

  // Listen for user disconnection
  socket.on("disconnect", () => {
    console.log(`[Socket.io] User disconnected: ${socket.id}`);
  });
});

httpServer.listen(PORT, () => {
  console.log(`[Socket.io] Mock server is running on http://localhost:${PORT}`);
});
