import mongoose from "mongoose";

const { Schema } = mongoose;

const LocationSchema = new Schema(
  {
    city: { type: String },
    state: { type: String },
    pincode: { type: String },
  },
  { _id: false }
);

const SocialSchema = new Schema(
  {
    linkedin: { type: String },
    github: { type: String },
    twitter: { type: String },
    website: { type: String },
  },
  { _id: false }
);

const PersonalSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    title: { type: String, required: true },
    summary: { type: String },
    email: { type: String, required: true, lowercase: true, trim: true },
    phone: { type: String },
    location: { type: LocationSchema },
    social: { type: SocialSchema },
  },
  { _id: false }
);

const SkillsSchema = new Schema(
  {
    frontend: { type: [String], default: [] },
    backend: { type: [String], default: [] },
    cloudDevOps: { type: [String], default: [] },
    stateManagement: { type: [String], default: [] },
    tools: { type: [String], default: [] },
    aiTools: { type: [String], default: [] },
    softSkills: { type: [String], default: [] },
  },
  { _id: false }
);

const PeriodSchema = new Schema(
  {
    start: { type: Date },
    end: { type: Date, default: null },
    isCurrent: { type: Boolean, default: false },
    display: { type: String },
  },
  { _id: false }
);

const ExperienceSchema = new Schema(
  {
    role: { type: String, required: true },
    company: { type: String, required: true },
    location: { type: String },
    period: { type: PeriodSchema },
    highlights: { type: [String], default: [] },
    technologies: { type: [String], default: [] },
  },
  { _id: false }
);

const ProjectSchema = new Schema(
  {
    title: { type: String, required: true },
    type: { type: String },
    period: { type: PeriodSchema },
    description: { type: [String], default: [] },
    technologies: { type: [String], default: [] },
    liveUrl: { type: String, default: null },
    repoUrl: { type: String, default: null },
  },
  { _id: false }
);

const EducationSchema = new Schema(
  {
    degree: { type: String, required: true },
    field: { type: String },
    institute: { type: String, required: true },
    university: { type: String },
    period: { type: PeriodSchema },
    cgpa: { type: Number, min: 0, max: 10 },
    location: { type: String },
  },
  { _id: false }
);

const portfolioSchema = new Schema(
  {
    personal: { type: PersonalSchema, required: true },
    skills: { type: SkillsSchema, default: () => ({}) },
    experience: { type: [ExperienceSchema], default: [] },
    projects: { type: [ProjectSchema], default: [] },
    education: { type: [EducationSchema], default: [] },
    interests: { type: [String], default: [] },
    meta: {
      version: { type: Number, default: 1 },
    },
  },
  {
    timestamps: true,
    versionKey: "__v",
    collection: "personal_details",
  }
);

portfolioSchema.index({ "personal.email": 1 }, { unique: true });
portfolioSchema.index(
  {
    "personal.name": "text",
    "skills.frontend": "text",
    "skills.backend": "text",
  },
  {}
);

export const Portfolio = mongoose.model("Portfolio", portfolioSchema);
