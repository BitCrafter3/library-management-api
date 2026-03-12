const Book = require("../models/Book");

// Add new book
exports.addBook = async (req, res) => {
try {

const book = new Book(req.body);

await book.save();

res.status(201).json({
message: "Book added successfully",
book
});

} catch (error) {

res.status(500).json({
message: "Error adding book",
error: error.message
});

}
};

// Get all books
exports.getBooks = async (req, res) => {
try {

const books = await Book.find();

res.status(200).json(books);

} catch (error) {

res.status(500).json({
message: "Error fetching books",
error: error.message
});

}
};

// Get book by ID
exports.getBookById = async (req, res) => {
try {

const book = await Book.findById(req.params.id);

if (!book) {
return res.status(404).json({ message: "Book not found" });
}

res.status(200).json(book);

} catch (error) {

res.status(500).json({
message: "Error fetching book",
error: error.message
});

}
};
exports.updateBook = async (req, res) => {
try {

const book = await Book.findByIdAndUpdate(
req.params.id,
req.body,
{ new: true }
);

if (!book) {
return res.status(404).json({ message: "Book not found" });
}

res.status(200).json({
message: "Book updated successfully",
book
});

} catch (error) {

res.status(500).json({
message: "Error updating book",
error: error.message
});

}
};
// Delete book
exports.deleteBook = async (req, res) => {
try {

const book = await Book.findByIdAndDelete(req.params.id);

if (!book) {
return res.status(404).json({ message: "Book not found" });
}

res.status(200).json({
message: "Book deleted successfully"
});

} catch (error) {

res.status(500).json({
message: "Error deleting book",
error: error.message
});

}
};
// Search book by title or author
exports.searchBooks = async (req, res) => {
try {

const { title, author } = req.query;

let query = {};

if (title) {
query.title = { $regex: title, $options: "i" };
}

if (author) {
query.author = { $regex: author, $options: "i" };
}

const books = await Book.find(query);

res.status(200).json(books);

} catch (error) {

res.status(500).json({
message: "Error searching books",
error: error.message
});

}
};