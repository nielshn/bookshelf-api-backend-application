const { nanoid } = require("nanoid");
const books = require("./bookshelf-api");

const addBookHandler = (request, h) => {
    const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;

    // Validasi payload
    if (!name) {
        return h.response({
            status: 'fail',
            message: "Gagal menambahkan buku. Mohon isi nama buku"
        }).code(400);
    }

    if (!year && !author && !summary && !publisher && !pageCount && !readPage && !reading) {
        return h.response({
            status: 'fail',
            message: "Gagal memperbarui buku. Mohon lengkapi data buku."
        }).code(400);
    }

    if (readPage > pageCount) {
        return h.response({
            status: 'fail',
            message: "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount"
        }).code(400);
    }


    const id = nanoid(16);
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;

    const finished = pageCount === readPage;

    const newBook = {
        id,
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        finished,
        reading,
        insertedAt,
        updatedAt
    }

    books.push(newBook);

    const response = h.response({
        status: 'success',
        message: "Buku berhasil ditambahkan",
        data: {
            bookId: id
        }
    })
    response.code(201);
    return response;
}
const getAllBooksHandler = (request, h) => {
    let filteredBooks = [...books];

    const { name, reading, finished } = request.query;

    // Filtering berdasarkan nama buku
    if (name) {
        filteredBooks = filteredBooks.filter(book => book.name.toLowerCase().includes(name.toLowerCase()));
    }

    // Filtering berdasarkan status membaca (reading)
    if (reading !== undefined) {
        const isReading = reading === '1';
        filteredBooks = filteredBooks.filter(book => book.reading === isReading);
    }

    // Filtering berdasarkan status selesai membaca (finished)
    if (finished !== undefined) {
        const isFinished = finished === '1';
        filteredBooks = filteredBooks.filter(book => book.finished === isFinished);
    }

    // Filter properti yang tidak diperlukan
    filteredBooks = filteredBooks.map(({ id, name, publisher }) => ({ id, name, publisher }));

    return {
        status: 'success',
        data: {
            books: filteredBooks
        }
    };
};



const getBookByIdHandler = (request, h) => {
    const { id } = request.params;
    const book = books.filter(book => book.id === id)[0];

    if (book !== undefined) {
        return {
            status: 'success',
            data: {
                book
            }
        }
    }
    const response = h.response({
        status: 'fail',
        message: "Buku tidak ditemukan"
    })
    response.code(404);
    return response;

}

const updateBookHandler = (request, h) => {
    const { id } = request.params;
    const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;
    const updatedAt = new Date().toISOString();

    // Validation
    if (!name) {
        return h.response({
            status: 'fail',
            message: "Gagal memperbarui buku. Mohon isi nama buku"
        }).code(400);
    }

    if (!year && !author && !summary && !publisher && !pageCount && !readPage && !reading) {
        return h.response({
            status: 'fail',
            message: "Gagal memperbarui buku. Mohon isi data yang diperbarui"
        }).code(400);
    }

    if (readPage > pageCount) {
        return h.response({
            status: 'fail',
            message: "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount"
        }).code(400);
    }

    const index = books.findIndex((book) => book.id === id)
    if (index !== -1) {
        books[index] = {
            ...books[index],
            name,
            year,
            author,
            summary,
            publisher,
            pageCount,
            readPage,
            reading,
            updatedAt
        }

        return h.response({
            status: 'success',
            message: "Buku berhasil diperbarui",
        }).code(200);
    } else {
        const response = h.response({
            status: 'fail',
            message: "Gagal memperbarui buku. Id tidak ditemukan"
        })
        response.code(404);
        return response;
    }
}

const deleteBookHandler = (request, h) => {
    const { id } = request.params;
    const index = books.findIndex((book) => book.id === id)
    if (index !== -1) {
        books.splice(index, 1)
        return h.response({
            status: 'success',
            message: "Buku berhasil dihapus",
        }).code(200);
    } else {
        const response = h.response({
            status: 'fail',
            message: "Buku gagal dihapus. Id tidak ditemukan"
        })
        response.code(404);
        return response;
    }
}

module.exports = {
    addBookHandler, getAllBooksHandler, getBookByIdHandler, updateBookHandler, deleteBookHandler
}
