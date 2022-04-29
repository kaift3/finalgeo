const mongoose = require("mongoose");

const PointSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
		unique: true,
	},
	name: {
		type: String,
		required: true,
	},
	description: {
		type: String,
	},
	latlng: {
		type: Array,
		default: [],
		required: true,
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "users",
	},
	date: {
		type: Date,
		default: Date.now,
	},
});

module.exports = Point = mongoose.model("point", PointSchema);
