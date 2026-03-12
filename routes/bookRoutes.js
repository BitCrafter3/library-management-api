const express = require("express");
const router = express.Router();

const { addBook, getBooks, getBookById, updateBook, deleteBook, searchBooks } = require("../controllers/bookController");

router.post("/", addBook);
router.get("/", getBooks);
router.get("/search", searchBooks);
router.get("/:id", getBookById);
router.put("/:id", updateBook);
router.delete("/:id", deleteBook);

module.exports = router;