import mongoose from "mongoose";

const ExecutionSchema = new mongoose.Schema(
  {
    workflowId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Workflow",
      required: true,
    },
    workflowName: { type: String, required: true },
    status: {
      type: String,
      enum: ["completed", "failed", "running", "pending"],
      default: "completed",
    },
    durationMs: { type: Number, default: 0 },
    executedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

ExecutionSchema.index({ workflowId: 1, executedAt: -1 });

export const Execution = mongoose.model("Execution", ExecutionSchema);
