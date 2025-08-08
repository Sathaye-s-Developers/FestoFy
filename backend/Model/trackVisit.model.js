const mongoose = require("mongoose");

const siteStatSchema = new mongoose.Schema({
  totalVisits: {
    type: Number,
    default: 0,
  },
});

const trackVisit = mongoose.model("trackVisit", siteStatSchema);
module.exports = trackVisit
