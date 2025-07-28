const Proposal = require("../models/Proposal");
// const { generateProposal } = require("../services/openaiService");
const fs = require("fs");
const PDFDocument = require("pdfkit");
const { generateProposal } = require("../services/geminiService"); // Changed from openaiService
const { generatePdf } = require("html-pdf-node");

exports.generateProposal = async (req, res) => {
  try {
    const {
      clientName,
      projectName,
      requirements,
      timeline,
      pricing,
      templateId,
    } = req.body;

    // Generate content with AI
    // const generatedContent = await generateProposal(
    //   {
    //     clientName,
    //     projectName,
    //     requirements,
    //     timeline,
    //     pricing,
    //   },
    //   templateId
    // );
    const generatedContent = await generateProposal(
      {
        clientName,
        projectName,
        requirements,
        timeline,
        pricing,
      },
      templateId
    );

    // Save to database
    const proposal = new Proposal({
      clientName,
      projectName,
      requirements,
      timeline,
      pricing,
      templateId,
      generatedContent,
    });

    await proposal.save();

    res.status(201).json(proposal);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error generating proposal" });
  }
};

exports.downloadProposal = async (req, res) => {
  try {
    const proposal = await Proposal.findById(req.params.id);

    if (!proposal) {
      return res.status(404).json({ message: "Proposal not found" });
    }

    const options = {
      format: "A4",
      margin: { top: "20mm", right: "20mm", bottom: "20mm", left: "20mm" },
      printBackground: true,
    };

    const file = {
      content: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial; line-height: 1.6; }
            h1 { color: #2c3e50; }
            table { width: 100%; border-collapse: collapse; }
            th, td { border: 1px solid #ddd; padding: 8px; }
            th { background-color: #f2f2f2; }
          </style>
        </head>
        <body>
          ${proposal.generatedContent}
        </body>
        </html>
      `,
    };

    const pdfBuffer = await generatePdf(file, options);

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=${proposal.projectName.replace(
        /\s+/g,
        "_"
      )}_Proposal.pdf`
    );

    res.send(pdfBuffer);
  } catch (error) {
    console.error("PDF Generation Error:", error);
    res.status(500).json({
      message: "Error generating PDF",
      error: error.message,
    });
  }
};
exports.getSingleProposal = async (req, res) => {
  try {
    const proposal = await Proposal.findById(req.params.id);

    if (!proposal) {
      return res.status(404).json({ message: "Proposal not found" });
    }

    res.status(200).json({
      status: true,
      data: proposal,
    });
  } catch (error) {
    console.error("PDF Generation Error:", error);
    res.status(500).json({
      message: "Error generating PDF",
      error: error.message,
    });
  }
};

exports.getAllProposal = async (req, res) => {
  try {
    const proposals = await Proposal.find().sort({ createdAt: -1 });
    res.json(proposals);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error downloading proposal" });
  }
};
exports.deleteProposal = async (req, res) => {
  try {
    const proposal = await Proposal.findByIdAndDelete(req.params.id);

    if (!proposal) {
      return res.status(404).json({ message: "Proposal not found" });
    }

    res.status(200).json({
      status: true,
      data: proposal,
    });
  } catch (error) {
    console.error("PDF Generation Error:", error);
    res.status(500).json({
      message: "Error generating PDF",
      error: error.message,
    });
  }
};

exports.getAllProposal = async (req, res) => {
  try {
    const proposals = await Proposal.find().sort({ createdAt: -1 });
    res.json(proposals);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error downloading proposal" });
  }
};
