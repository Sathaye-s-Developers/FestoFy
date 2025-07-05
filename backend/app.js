const express = require("express");
const app = express();

const dotenv = require("dotenv");
dotenv.config();
const url = process.env.Backend_Url;
const axios = require("axios");
const interval = 300000;
function reloadWebsite() {
  axios
    .get(url)
    .then((res) => {
      console.log("Website reloaded");
    })
    .catch((err) => {
      console.log("error:", err);
    });
}
setInterval(reloadWebsite, interval);

const cors = require("cors");
const connectDB = require("./configure/database");

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
cors({
  origin: "https://festofy-frontend.onrender.com",
  credentials: true,
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
const homeRoutes = require("./routes/home.router");
const userRoutes = require("./routes/user.router");
const otpRoutes = require("./routes/otp.router");
const eventRoutes = require("./routes/event.router");
const subeventRoutes = require("./routes/subevent.router");
const particioationRoutes = require("./routes/participation.router");

app.use("/", homeRoutes);
app.use("/Festofy/user", userRoutes);
app.use("/Festofy/user/otp", otpRoutes);
app.use("/Festofy/user/event", eventRoutes);
app.use("/Festofy/user/event/subevent", subeventRoutes);
app.use("/Festofy/participation/", particioationRoutes);

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(` Server started on http://localhost:${PORT}`);
});
