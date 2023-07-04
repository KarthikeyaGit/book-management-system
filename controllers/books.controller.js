const db = require('../database/database');

module.exports.addBook = (req, res) => {
    const { bookName, authorName, genre, status, userId } = req.body;
    
    const bookQuery = 'INSERT INTO books (book_name, author_name, genre) VALUES (?, ?, ?)';
    const bookValues = [bookName, authorName, genre];
  
    db.query(bookQuery, bookValues, (error, bookResult) => {
      if (error) {
        console.error('Error adding book:', error);
        return res.status(500).json({ error: 'Failed to add book' });
      }
  
      const bookId = bookResult.insertId;
  
      const mappingQuery = 'INSERT INTO user_book_mapping (user_id, book_id, status) VALUES (?, ?, ?)';
      const mappingValues = [userId, bookId, status];
  
      db.query(mappingQuery, mappingValues, (error, mappingResult) => {
        if (error) {
          console.error('Error adding book mapping:', error);
          return res.status(500).json({ error: 'Failed to add book mapping' });
        }
  
        return res.status(200).json({ message: 'Book added successfully' });
      });
    });
};

module.exports.editBookByBookId = (req, res) => {
    const { bookId, bookName, authorName, genre, status, userId } = req.body;
    
    const bookQuery = 'UPDATE books SET book_name = ?, author_name = ?, genre = ? WHERE book_id = ?';
    const bookValues = [bookName, authorName, genre, bookId];
  
    db.query(bookQuery, bookValues, (error, bookResult) => {
      if (error) {
        console.error('Error editing book:', error);
        return res.status(500).json({ error: 'Failed to edit book' });
      }
  
      const mappingQuery = 'UPDATE user_book_mapping SET status = ? WHERE book_id = ? AND user_id = ?';
      const mappingValues = [status, bookId, userId];
  
      db.query(mappingQuery, mappingValues, (error, mappingResult) => {
        if (error) {
          console.error('Error editing book mapping:', error);
          return res.status(500).json({ error: 'Failed to edit book mapping' });
        }
  
        if (bookResult.affectedRows === 0 || mappingResult.affectedRows === 0) {
          return res.status(404).json({ error: 'Book not found or user does not have permission' });
        }
  
        return res.status(200).json({ message: 'Book edited successfully' });
      });
    });
};

module.exports.getBooksByUserId = (req, res) => {
    const userId = req.params.userId;
  
    const query = 'SELECT * FROM books JOIN user_book_mapping ON books.book_id = user_book_mapping.book_id WHERE user_book_mapping.user_id = ?';
    const values = [userId];
  
    db.query(query, values, (error, results) => {
      if (error) {
        console.error('Error executing MySQL query:', error);
        return res.status(500).json({ error: 'Failed to fetch books' });
      }
  
      return res.status(200).json(results);
    });
};
  
module.exports.deleteBookByUserId = (req, res) => {

  const deleteQuery = 'DELETE FROM user_book_mapping WHERE book_id = ? AND user_id = ?';
  const deleteValues = [req.params.bookId, req.params.userId];

  db.query(deleteQuery, deleteValues, (error, result) => {
    if (error) {
      console.error('Error deleting book:', error);
      return res.status(500).json({ error: 'Failed to delete book' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Book not found or user does not have permission' });
    }

    return res.status(200).json({ message: 'Book deleted successfully' });
  });
};

  
  
  
  