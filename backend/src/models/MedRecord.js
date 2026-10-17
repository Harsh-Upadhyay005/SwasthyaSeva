const mongoose = require("mongoose");

const medRecordSchema = new mongoose.Schema(
	{
		patientId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
			index: true,
		},
		doctorId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
		date: {
			type: Date,
			default: Date.now,
			index: true,
		},
		diagnosis: {
			type: String,
			required: true,
			trim: true,
		},
		notes: {
			type: String,
			trim: true,
			default: "",
		},
		medicines: {
			type: [String],
			default: [],
		},
		fileUrls: {
			type: [String],
			default: [],
		},
		aiSummary: {
			type: String,
			trim: true,
			default: "",
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("MedRecord", medRecordSchema);
