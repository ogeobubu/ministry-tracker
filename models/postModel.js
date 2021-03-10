const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  title: String,
  message: String,
  saved: Number,
  filled: Number,
  healed: Number,
  disciple: Number,
  creator: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserMinistryTrack",
    },
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Post = mongoose.model("PostMessages", postSchema);

module.exports = Post;
