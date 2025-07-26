const OpenAI = require("openai");
const openai = new OpenAI(process.env.OPENAI_API_KEY);

exports.generateProposal = async (proposalData, templateStyle) => {
  const prompt = `
  Create a professional web development proposal using the following details:
  Client: ${proposalData.clientName}
  Project: ${proposalData.projectName}
  Requirements: ${proposalData.requirements}
  Timeline: ${JSON.stringify(proposalData.timeline)}
  Budget: $${proposalData.pricing.total}
  
  Style: ${templateStyle}
  
  Include:
  1. Cover page
  2. Project overview
  3. Scope of work
  4. Timeline with milestones
  5. Pricing breakdown
  6. Terms and conditions
  `;

  const completion = await openai.chat.completions.create({
    messages: [{ role: "user", content: prompt }],
    model: "gpt-4",
  });

  return completion.choices[0].message.content;
};
