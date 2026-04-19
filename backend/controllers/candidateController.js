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

// Get all candidates
const getAllCandidates = async (req, res) => {
  try {
    let query = {};
    if (req.query.stage) {
      query.stage = req.query.stage;
    }

    let sortOptions = {};
    if (req.query.sortBy) {
      const order = req.query.sortOrder === 'desc' ? -1 : 1;
      sortOptions[req.query.sortBy] = order;
    } else {
      sortOptions['applicationDate'] = -1; // Default descending sort
    }

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 100;
    const skip = (page - 1) * limit;

    const candidates = await Store.find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(limit);

    const total = await Store.countDocuments(query);
    const totalPages = Math.ceil(total / limit);

    const formattedCandidates = candidates.map(c => ({ id: c._id.toString(), ...c._doc }));
    
    res.json({
      data: formattedCandidates,
      pagination: {
        total,
        page,
        totalPages,
        limit
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single candidate
const getCandidateById = async (req, res) => {
  try {
    const candidate = await Store.findById(req.params.id);
    if (!candidate) {
      return res.status(404).json({ message: "Candidate not found" });
    }
    res.json({ id: candidate._id.toString(), ...candidate._doc });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update candidate
const updateCandidate = async (req, res) => {
  try {
    const candidate = await Store.findByIdAndUpdate(req.params.id, req.body, { returnDocument: 'after' });
    if (!candidate) {
      return res.status(404).json({ message: "Candidate not found" });
    }
    res.json({ id: candidate._id.toString(), ...candidate._doc });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete candidate
const deleteCandidate = async (req, res) => {
  try {
    const candidate = await Store.findByIdAndDelete(req.params.id);
    if (!candidate) {
      return res.status(404).json({ message: "Candidate not found" });
    }
    res.json({ id: candidate._id.toString(), ...candidate._doc });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createCandidate,
  getAllCandidates,
  getCandidateById,
  updateCandidate,
  deleteCandidate
};
