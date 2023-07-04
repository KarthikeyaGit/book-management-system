const express = require('express');
const router = express.Router();


const userController = require('../controllers/user.controller');
router.post('/login', userController.login);
router.post('/signup', userController.signup);


const booksController = require('../controllers/books.controller')
router.post('/addbook', booksController.addBook);
router.post('/editbookbybid', booksController.editBookByBookId);
router.get('/getbookbyuid/:userId', booksController.getBooksByUserId);
router.get('/deleteBookByUserId/:userId/:bookId', booksController.deleteBookByUserId);


module.exports = router;