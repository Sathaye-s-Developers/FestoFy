const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const axios = require('axios');

const url=process.env.Backend_Url;
const interval=300000;

function reloadWebsite(){
    axios.get(url).then((res)=>{
      console.log("Website reloaded")
    }).catch((err)=>{
      console.log('error:',err)
    })
}

const cors = require('cors');
const connectDB = require('./configure/database');

// Connect to MongoDB
connectDB();

// Middleware

app.use(cors({origin:process.env.Frontend_Url}))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/cors-test', (req, res) => {
  res.json({ message: "CORS works!" });
});

// Routes
const homeRoutes = require('./routes/home.router');
const userRoutes = require('./routes/user.router');
const otpRoutes=require('./routes/otp.router');


app.use('/', homeRoutes);
app.use('/Festofy/user', userRoutes);
app.use('/Festofy/user/otp',otpRoutes);

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(` Server started on http://localhost:${PORT}`);
});
