const Store = require('../models/Store');

// Create candidate
const createCandidate = async (req, res) => {
  try {
    const { name, stage, applicationDate, overallScore, referral, assessmentStatus } = req.body;
    
    // Generate avatar automatically if not provided
    const avatar = req.body.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`;

    const newCandidate = new Store({
      name,
      stage,
      applicationDate: applicationDate || Date.now(),
      overallScore,
      referral,
      assessmentStatus,
      avatar
    });

    const savedCandidate = await newCandidate.save();
    res.status(201).json({ id: savedCandidate._id, ...savedCandidate._doc });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createCandidate
};
