const mongoose = require("mongoose");

const noteSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      require,
      ref: "User",
    },
    title: {
      type: String,
      require,
    },
    text: {
      type: String,
      require,
    },
    description: {
      type: String,
      require,
    },
    language: {
      type: String,
      require,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("note", noteSchema);
