import mongoose from "mongoose";

const personalDetailsSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true },
    title: { type: String, trim: true },
    summary: { type: String, trim: true },
    email: { type: String, trim: true, lowercase: true },
    phone: { type: String, trim: true },
    location: { type: String, trim: true },
    linkedin: { type: String, trim: true },
  },
  { timestamps: true, collection: "personal_details" }
);

export const PersonalDetails = mongoose.model(
  "PersonalDetails",
  personalDetailsSchema
);

