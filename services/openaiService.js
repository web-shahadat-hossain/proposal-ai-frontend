const OpenAI = require("openai");
const openai = new OpenAI(process.env.OPENAI_API_KEY);

exports.generateProposal = async (proposalData, templateId) => {
  const prompt = `
  Generate a professional web development proposal with the following details:
  
  Client: ${proposalData.clientName}
  Project: ${proposalData.projectName}
  Requirements: ${proposalData.requirements}
  Timeline: ${JSON.stringify(proposalData.timeline)}
  Budget: $${proposalData.pricing.total}
  
  Include:
  1. Cover page with project title
  2. Detailed scope of work
  3. Timeline with milestones
  4. Pricing breakdown
  5. Terms and conditions
  `;

  try {
    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "gpt-4.1",
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error("OpenAI Error:", error);
    throw new Error("Failed to generate proposal content");
  }
};
