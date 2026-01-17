const express = require("express");
const router = express.Router();
const Complaint = require("../models/Complaint");
const protect = require("../middleware/authMiddleware");

// ==============================
// CREATE Complaint
// ==============================
router.post("/", protect, async (req, res) => {
  try {
    const { title, description, location } = req.body;

    const complaint = await Complaint.create({
      title,
      description,
      location,
      user: req.user,
    });

    res.status(201).json(complaint);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ==============================
// GET ALL Complaints
// ==============================
router.get("/", protect, async (req, res) => {
  try {
    const complaints = await Complaint.find().sort({ createdAt: -1 });
    res.status(200).json(complaints);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ==============================
// UPDATE Complaint Status (ADMIN)
// ==============================
router.put("/:id/status", protect, async (req, res) => {
  try {
    const { status } = req.body;

    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }

    complaint.status = status;
    await complaint.save();

    res.status(200).json({
      message: "Complaint status updated successfully",
      complaint,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
