const Complaint = require("../models/Complaint");

// CREATE complaint
const createComplaint = async (req, res) => {
  try {
    const complaint = new Complaint({
      ...req.body,
      user: req.user
    });

    await complaint.save();
    res.status(201).json(complaint);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET complaints
const getComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find().sort({ createdAt: -1 });
    res.status(200).json(complaints);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createComplaint, getComplaints };
