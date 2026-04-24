import mongoose from "mongoose";

const portfolioSchema = new mongoose.Schema(
  {
    personal: {
      name: String,
      title: String,
      summary: String,
      email: String,
      phone: String,
      location: String,
      linkedin: String,
    },
    skills: {
      frontend: [String],
      backend: [String],
      cloudDevOps: [String],
      stateManagement: [String],
      tools: [String],
      aiTools: [String],
      softSkills: [String],
    },
    experience: [
      {
        role: String,
        company: String,
        period: String,
        highlights: [String],
        technologies: [String],
      },
    ],
    projects: [
      {
        title: String,
        period: String,
        description: [String],
        technologies: [String],
      },
    ],
    education: [
      {
        degree: String,
        institute: String,
        university: String,
        period: String,
        cgpa: String,
        location: String,
      },
    ],
    interests: [String],
  },
  { timestamps: true }
);

export const Portfolio = mongoose.model("Portfolio", portfolioSchema);
