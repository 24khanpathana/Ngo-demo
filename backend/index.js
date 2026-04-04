const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const Admin = require("./models/Admin");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- Initial Admin Creation (Run Once) ---
// This function creates the first admin user from your .env file.
// UNCOMMENT it, run the server once, then COMMENT it out again.

const createAdmin = async () => {
  try {
    const adminId = process.env.ADMIN_ID || "amaanp2710@gmail.com";
    const adminExists = await Admin.findOne({ adminId });
    if (!adminExists) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash("amaan@team", salt);

      const newAdmin = new Admin({
        adminId,
        password: hashedPassword,
      });

      await newAdmin.save();
      console.log("Admin user created successfully.");
    } else {
      console.log("Admin user already exists.");
    }
  } catch (error) {
    console.error("Error creating admin user:", error);
  }
};

// --- Database Connection ---
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully.");
    // createAdmin(); // UNCOMMENT to run, then COMMENT out.
  })
  .catch((err) => console.error("MongoDB connection error:", err));

// ... [Keep everything above the routes exactly the same] ...

// --- API Routes ---
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/slots", require("./routes/slotRoutes"));
app.use("/api/donations", require("./routes/donationRoutes"));
app.use("/api/volunteers", require("./routes/volunteerRoutes"));
app.use("/api/feedback", require("./routes/feedbackRoutes"));
app.use("/api/complaints", require("./routes/complaintRoutes"));
app.use("/api/content", require("./routes/contentRoutes"));
app.use("/api/forms", require("./routes/formRoutes")); // <-- New
// Add this under your other API Routes in server.js
app.use("/api/animals", require("./routes/animalRoutes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));