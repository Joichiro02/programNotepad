const asyncHandler = require("express-async-handler");
const Note = require("../model/noteModel");
const User = require("../model/userModel");

const getNotes = asyncHandler(async (req, res) => {
  const notes = await Note.find({ user: req.user._id });

  res.status(200).json(notes);
});

const setNote = asyncHandler(async (req, res) => {
  const { title, text, description, language } = req.body;

  if (!title && !text && !description && !language) {
    res.status(400);
    throw new Error("Please add a text field");
  }

  const note = await Note({
    user: req.user._id,
    title,
    text,
    description,
    language,
  });
  note.save();

  res.status(200).json(note);
});

const updateNote = asyncHandler(async (req, res) => {
  const note = await Note.findById(req.params.id);
  if (!note) {
    res.status(400);
    throw new Error("Goal not found");
  }

  const user = await User.findById(req.user._id);
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  if (note.user.toString() !== user._id.toString()) {
    res.status(401);
    throw new Error("User not Authorized");
  }

  const updateNote = await Note.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updateNote);
});

const deleteNote = asyncHandler(async (req, res) => {
  const note = await Note.findById(req.params.id);
  if (!note) {
    res.status(400);
    throw new Error("Goal not found");
  }

  const user = await User.findById(req.user._id);
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  if (note.user.toString() !== user._id.toString()) {
    res.status(401);
    throw new Error("User not Authorized");
  }

  await note.remove();

  res.status(200).json({ _id: req.params.id });
});

module.exports = {
  getNotes,
  setNote,
  updateNote,
  deleteNote,
};
