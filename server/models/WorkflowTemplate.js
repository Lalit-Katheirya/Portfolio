import mongoose from "mongoose";

const WorkflowTemplateSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, default: "" },
    category: { type: String, default: "General" },
    icon: { type: String, default: "zap" },
    color: { type: String, default: "#8b5cf6" },
    nodes: { type: Array, default: [] },
  },
  { timestamps: true }
);

export const WorkflowTemplate = mongoose.model(
  "WorkflowTemplate",
  WorkflowTemplateSchema
);
