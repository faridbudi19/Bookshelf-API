const { nanoid } = require('nanoid');
const books = require('./books.js');

const addBook = (request, h) => {
  const { nama, tahun, penulis, summary, penerbit, pageCount, readPage, reading } = request.payload;

  if (nama === undefined) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku'
    });

    response.code(400);
    return response;
  }

  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount'
    });

    response.code(400);
    return response;
  }

  const id = nanoid(16);
  const finished = pageCount === readPage;
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;

  const newBook = { id, nama, tahun, penulis, summary, penerbit, pageCount, readPage, finished, reading, insertedAt, updatedAt };

  books.push(newBook);

  const isSuccess = books.filter((book) => book.id === id).length > 0;

  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: newBook.id
      }
    });

    response.code(201);
    return response;
  }
};

const getAllBooks = (request, h) => {
  const { nama, reading, finished } = request.query;

  if (nama !== undefined) {
    const book = books.filter((book) => book.nama.toLowerCase().includes(nama.toLowerCase()));

    const response = h.response({
      status: 'success',
      data: {
        books: book.map((book) => ({
          id: book.id,
          nama: book.nama,
          penerbit: book.penerbit,
        }),
        ),
      },
    });

    response.code(200);
    return response;
  }

  if (reading !== undefined) {
    const book = books.filter((book) => Number(book.reading) === Number(reading));

    const response = h.response({
      status: 'success',
      data: {
        books: book.map((book) => ({
          id: book.id,
          nama: book.nama,
          penerbit: book.penerbit,
        }),
        ),
      },
    });

    response.code(200);
    return response;
  }

  if (finished !== undefined) {
    const book = books.filter((book) => Number(book.finished) === Number(finished));

    const response = h.response({
      status: 'success',
      data: {
        books: book.map((book) => ({
          id: book.id,
          nama: book.nama,
          penerbit: book.penerbit,
        }),
        ),
      },
    });

    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'success',
    data: {
      books: books.map((book) => ({
        id: book.id,
        nama: book.nama,
        penerbit: book.penerbit,
      })),
    },
  });
  response.code(200);
  return response;
};

const getBookById = (request, h) => {
  const { id } = request.params;
  const book = books.filter((book) => book.id === id)[0];

  if (book !== undefined) {
    return {
      status: 'success',
      data: {
        book,
      },
    };
  }

  const response = h.response({
    status: 'fail',
    message: 'Buku tidak ditemukan',
  });

  response.code(404);
  return response;
};

const editBookById = (request, h) => {
  const { id } = request.params;

  const { nama, tahun, penulis, summary, penerbit, pageCount, readPage, reading } = request.payload;

  if (nama === undefined) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Mohon isi nama buku',
    });

    response.code(400);
    return response;
  }

  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
    });

    response.code(400);
    return response;
  }

  const updatedAt = new Date().toISOString();

  const index = books.findIndex((book) => book.id === id);

  if (index !== -1) {
    books[index] = {
      ...books[index],
      nama,
      tahun,
      penulis,
      summary,
      penerbit,
      pageCount,
      readPage,
      reading,
      updatedAt,
    };

    const response = h.response({
      status: 'success',
      message: 'Buku berhasil diperbarui',
    });

    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui buku. Id tidak ditemukan',
  });

  response.code(404);
  return response;
};

const deleteBookById = (request, h) => {
  const { id } = request.params;

  const index = books.findIndex((book) => book.id === id);

  if (index !== -1) {
    books.splice(index, 1);
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil dihapus',
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Buku gagal dihapus. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

module.exports = { addBook, getAllBooks, getBookById, editBookById, deleteBookById };