const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema(
  {
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    reportType: {
      type: String,
      required: true,
      trim: true,
      default: "Other",
    },
    originalName: {
      type: String,
      required: true,
      trim: true,
    },
    mimeType: {
      type: String,
      required: true,
      trim: true,
    },
    size: {
      type: Number,
      required: true,
      min: 0,
    },
    fileUrl: {
      type: String,
      required: true,
      trim: true,
    },
    cloudinaryPublicId: {
      type: String,
      required: true,
      trim: true,
    },
    cloudinaryResourceType: {
      type: String,
      required: true,
      trim: true,
      default: "image",
    },
    aiSummary: {
      type: String,
      trim: true,
      default: "",
    },
    ocrText: {
      type: String,
      trim: true,
      default: "",
    },
    ocrConfidence: {
      type: Number,
      min: 0,
      max: 1,
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Report", reportSchema);
