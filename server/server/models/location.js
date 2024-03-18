const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema({

location: {
    type: [String],
    enum: ["1st Circle", "2nd Circle", "3rd Circle", "4th Circle", "5th Circle", "6th Circle", "7th Circle", "8th Circle", "Abdali", "Abdoun","Bader", "Bayader", "Business Park", "Dakhiliyah", "Hay Nazzal", "Hussein", "Ithaa Street", "Jabal Al-Weibdeh", "Jabal Amman", "Jandaweel", "Jubeiha", "Khalda", "Mahatta", "Marka", "Masharqah", "Muqabalain", "Nasr", "Qasr", "Quraish Street", "Qweismeh", "Rabieh", "Rainbow Street", "Rawabi", "Rashid", "Shmeisani", "Sport City", "Sweifieh", "Tlaa Ali", "Um Uthaina", "Waha", "Wakalat Street", "Yasmeen"]
}})

const Location = mongoose.model('Location', locationSchema);

module.exports = Location