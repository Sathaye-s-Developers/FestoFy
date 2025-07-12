const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");

const dotenv = require("dotenv");
dotenv.config();
const url = process.env.Backend_Url;
const axios = require("axios");

// Auto-reload
const interval = 300000;
function reloadWebsite() {
  axios
    .get(url)
    .then(() => console.log("Website reloaded"))
    .catch((err) => console.log("error:", err));
}
setInterval(reloadWebsite, interval);

// DB + Middleware
const cors = require("cors");
const connectDB = require("./configure/database");
connectDB();

app.use(
  cors({ origin: "https://festofy-frontend.onrender.com", credentials: true })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
const homeRoutes = require("./routes/home.router");
const userRoutes = require("./routes/user.router");
const otpRoutes = require("./routes/otp.router");
const eventRoutes = require("./routes/event.router");
const subeventRoutes = require("./routes/subevent.router");
const participationRoutes = require("./routes/participation.router");

app.use("/", homeRoutes);
app.use("/Festofy/user", userRoutes);
app.use("/Festofy/user/otp", otpRoutes);
app.use("/Festofy/user/event", eventRoutes);
app.use("/Festofy/user/event/subevent", subeventRoutes);
app.use("/Festofy/participation/", participationRoutes);

//  Setup Socket.IO
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "https://festofy-frontend.onrender.com",
    methods: ["GET", "POST", "PUT"],
    credentials: true,
  },
});
app.set("io", io);

// Socket Events (optional test)
io.on("connection", (socket) => {
  console.log("New client connected:", socket.id);
  socket.on("disconnect", () =>
    console.log(" Client disconnected:", socket.id)
  );
});

// Start Server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
