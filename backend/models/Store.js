const mongoose = require('mongoose');

const storeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  stage: { type: String, required: true }, // Application Stage
  applicationDate: { type: Date, default: Date.now },
  overallScore: { type: Number, required: true },
  referral: { type: String, required: true }, // Referral status
  assessmentStatus: { 
    type: String, 
    required: true,
    enum: ['Pending', 'Passed', 'Failed'],
    default: 'Pending'
  },
  avatar: { type: String }
});

module.exports = mongoose.model('Store', storeSchema);
