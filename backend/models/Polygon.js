const mongoose = require("mongoose");

const PolygonSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	description: {
		type: String,
	},
	coords: {
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

module.exports = Polygon = mongoose.model("polygon", PolygonSchema);
