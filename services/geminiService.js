const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

exports.generateProposal = async (proposalData, templateStyle) => {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `
  Generate a professional web development proposal in HTML format with:
  - Client: ${proposalData.clientName}
  - Project: ${proposalData.projectName}
  - Requirements: ${proposalData.requirements}
  - Timeline: ${JSON.stringify(proposalData.timeline)}
  - Budget: $${proposalData.pricing.total}
  - Style: ${templateStyle}

  Include these sections:
  1. Cover Page with Project Title
  2. Scope of Work
  3. Technical Approach
  4. Timeline with Milestones
  5. Pricing Breakdown
  6. Terms & Conditions
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Gemini Error:", error);
    throw new Error("Failed to generate proposal content");
  }
};
