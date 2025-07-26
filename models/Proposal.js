const mongoose = require("mongoose");

const ProposalSchema = new mongoose.Schema({
  clientName: String,
  projectName: String,
  requirements: String,
  timeline: {
    startDate: Date,
    milestones: [
      {
        name: String,
        dueDate: Date,
      },
    ],
  },
  pricing: {
    total: Number,
    breakdown: String,
  },
  templateId: mongoose.Schema.Types.ObjectId,
  generatedContent: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Proposal", ProposalSchema);
