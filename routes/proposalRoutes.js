const express = require("express");
const router = express.Router();
const {
  generateProposal,
  downloadProposal,
  getAllProposal,
  getSingleProposal,
} = require("../controllers/proposalController");

// Generate proposal route
router.post("/generate", generateProposal);

// Download proposal route
router.get("/download/:id", downloadProposal);
router.get("/signle/:id", getSingleProposal);
router.get("/all", getAllProposal);

module.exports = router;
