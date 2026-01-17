const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const complaintRoutes = require("./routes/complaintRoutes");

dotenv.config();

const app = express();

/* ✅ MIDDLEWARE (ORDER MATTERS) */
app.use(cors());
app.use(express.json()); // 👈 sabse important

/* ✅ ROUTES */
app.use("/api/auth", authRoutes);
app.use("/api/complaints", complaintRoutes)

/* DB Connection */
connectDB();

/* Test route */
app.get("/", (req, res) => {
  res.send("Civic Complaint Backend Running 🚀");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
