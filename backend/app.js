const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();

const url=``;
const interval=30000;

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
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Routes
const homeRoutes = require('./routes/home.router');
const userRoutes = require('./routes/user.router');
const otpRoutes=require('./routes/otp.router');
const { default: axios } = require('axios');

app.use('/', homeRoutes);
app.use('/Festofy/user', userRoutes);
app.use('/Festofy/user/otp',otpRoutes);

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(` Server started on http://localhost:${PORT}`);
});
