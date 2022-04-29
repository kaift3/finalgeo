const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");

const Point = require("../../models/Point");
// const Profile = require('../../models/Profile')
const User = require("../../models/User");

// @route   POSTS api/points
// @desc    Add Point
// @access  Private
router.post(
	"/",
	[
		auth,
		[
			check("name", "Name is reequired.").not().isEmpty(),
			check("latlng", "Please include the coordinates.").not().isEmpty(),
		],
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		try {
			const user = await User.findById(req.user.id).select("-password");

			const newPoint = new Point({
				name: req.body.name,
				email: user.email,
				description: req.body.description,
				latlng: req.body.latlng,
				user: req.user.id,
			});

			const point = await newPoint.save();

			res.json(point);
		} catch (err) {
			console.error(err.message);
			res.status(500).send("server error");
		}
	}
);

// @route   GET api/points
// @desc    Get all points
// @access  Private
router.get("/", auth, async (req, res) => {
	try {
		const points = await Point.find().sort({ date: -1 });
		res.json(points);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("server error");
	}
});

// @route   GET api/points/:id
// @desc    Get points by id
// @access  Private
router.get("/:id", auth, async (req, res) => {
	try {
		const point = await Point.findById(req.params.id);
		if (!point) {
			return res.status(404).json({ msg: "Point not found." });
		}
		res.json(point);
	} catch (err) {
		console.error(err.message);
		if (err.kind == "ObjectId") {
			return res.status(404).json({ msg: "Point not found." });
		}
		res.status(500).send("server error");
	}
});

// @route   DELETE api/points/:id
// @desc    Delete a point by id
// @access  Private
router.delete("/:id", auth, async (req, res) => {
	try {
		const point = await Point.findById(req.params.id);

		if (point.user.toString() !== req.user.id) {
			return res.status(401).json({ msg: "User not authorised." });
		}

		await point.remove();

		res.json({ msg: "Point removed." });
	} catch (err) {
		console.error(err.message);
		if (err.kind == "ObjectId") {
			return res.status(404).json({ msg: "Point not found." });
		}
		res.status(500).send("server error");
	}
});

// // @route   PUT api/posts/like/:id
// // @desc    Like a post
// // @access  Private
// router.put("/like/:id", auth, async (req, res) => {
// 	try {
// 		const post = await Post.findById(req.params.id);

// 		// check if post has already been liked
// 		if (
// 			post.likes.filter((like) => like.user.toString() === req.user.id).length >
// 			0
// 		) {
// 			return res.status(400).json({ msg: "Already liked." });
// 		}

// 		post.likes.unshift({ user: req.user.id });

// 		await post.save();

// 		res.json(post.likes);
// 	} catch (err) {
// 		console.error(err.message);
// 		res.status(500).send("server error");
// 	}
// });

// // @route   PUT api/posts/unlike/:id
// // @desc    Like a post
// // @access  Private
// router.put("/unlike/:id", auth, async (req, res) => {
// 	try {
// 		const post = await Post.findById(req.params.id);

// 		// check if post has already been liked
// 		if (
// 			post.likes.filter((like) => like.user.toString() === req.user.id)
// 				.length === 0
// 		) {
// 			return res.status(400).json({ msg: "Post has not yet been liked." });
// 		}

// 		const removeIndex = post.likes
// 			.map((like) => like.user.toString())
// 			.indexOf(req.user.id);

// 		post.likes.splice(removeIndex, 1);

// 		await post.save();

// 		res.json(post.likes);
// 	} catch (err) {
// 		console.error(err.message);
// 		res.status(500).send("server error");
// 	}
// });

// // @route   POSTS api/posts/comment/:id
// // @desc    Add comment on Post of id
// // @access  Private
// router.post(
// 	"/comment/:id",
// 	[auth, [check("text", "Text is required.").not().isEmpty()]],
// 	async (req, res) => {
// 		const errors = validationResult(req);
// 		if (!errors.isEmpty()) {
// 			return res.status(400).json({ errors: errors.array() });
// 		}

// 		try {
// 			const user = await User.findById(req.user.id).select("-password");
// 			const post = await Post.findById(req.params.id);
// 			const newComment = {
// 				text: req.body.text,
// 				name: user.name,
// 				avatar: user.avatar,
// 				user: req.user.id,
// 			};

// 			post.comments.unshift(newComment);

// 			await post.save();

// 			res.json(post.comments);
// 		} catch (err) {
// 			console.error(err.message);
// 			res.status(500).send("server error");
// 		}
// 	}
// );

// // @route    DELETE api/posts/comment/:id/:comment_id
// // @desc     Delete comment
// // @access   Private
// router.delete("/comment/:id/:comment_id", auth, async (req, res) => {
// 	try {
// 		const post = await Post.findById(req.params.id);

// 		// Pull out comment
// 		const comment = post.comments.find(
// 			(comment) => comment.id === req.params.comment_id
// 		);

// 		// Make sure comment exists
// 		if (!comment) {
// 			return res.status(404).json({ msg: "Comment does not exist" });
// 		}

// 		// Check user
// 		if (comment.user.toString() !== req.user.id) {
// 			return res.status(401).json({ msg: "User not authorized" });
// 		}

// 		// Get remove index
// 		const removeIndex = post.comments
// 			.map((comment) => comment.id)
// 			.indexOf(req.params.comment_id);

// 		post.comments.splice(removeIndex, 1);

// 		await post.save();

// 		res.json(post.comments);
// 	} catch (err) {
// 		console.error(err.message);
// 		res.status(500).send("Server Error");
// 	}
// });

module.exports = router;
