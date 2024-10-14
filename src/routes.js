const {
  addBookHandler,
  displayAllBooksHandler,
  showBookDetailsHandler,
  changeBookDataHandler,
  deleteBookHandler,
} = require('./handler');

const routes = [
  {
    // Criterion 1: API Can Save Books
    method: 'POST',
    path: '/books',
    handler: addBookHandler,
  },
  {
    // Criterion 2: API Can Display Entire Books
    method: 'GET',
    path: '/books',
    handler: displayAllBooksHandler,
  },
  {
    // Criterion 3: API Can Show Book Details
    method: 'GET',
    path: '/books/{bookId}',
    handler: showBookDetailsHandler,
  },
  {
    // Criterion 4: API Can Change Book Data
    method: 'PUT',
    path: '/books/{bookId}',
    handler: changeBookDataHandler,
  },
  {
    // Criterion 5: API Can Delete Books
    method: 'DELETE',
    path: '/books/{bookId}',
    handler: deleteBookHandler,
  },
];

module.exports = routes;
