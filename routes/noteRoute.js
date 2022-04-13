const router = require("express").Router();
const {
  getNotes,
  setNote,
  updateNote,
  deleteNote,
} = require("../controller/noteController");
const { protect } = require("../middleware/authMiddleware");

router.get("/", protect, getNotes);
router.post("/", protect, setNote);
router.patch("/:id", protect, updateNote);
router.delete("/:id", protect, deleteNote);

module.exports = router;
