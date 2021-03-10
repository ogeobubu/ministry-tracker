const Post = require("../models/postModel");

exports.createPost = async (req, res) => {
  try {
    const post = req.body;

    const newPost = new Post({
      ...post,
      creator: req.user.id,
    });

    await newPost.save();

    return res.status(201).json({
      message: "Post has been created!",
      newPost,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
exports.getPost = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findById(id);

    return res.status(200).json(post);
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find({ creator: req.user.id });

    return res.status(200).json(posts);
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
exports.editPost = async (req, res) => {
  try {
    const { id: _id } = req.params;
    const post = req.body;

    const updatePost = await Post.findByIdAndUpdate(_id, post, {
      new: true,
    });

    if (!updatePost) {
      return res.status(400).json({
        message: "This post ID does not exist",
      });
    }

    return res.status(200).json({
      message: "Post has been successfully updated.",
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);

    if (!post) {
      return res.status(400).json({
        message: "This post ID does not exist",
      });
    }

    res.status(200).json({
      message: "Post has successfully been deleted.",
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
