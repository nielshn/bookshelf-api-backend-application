const { nanoid } = require("nanoid");
const notes = require("./notes");

const addNoteHandler = (request, h) => {
    // get body request in HAPI
    const { title, tags, body } = request.payload;
    const id = nanoid(16);
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const newNote = {
        title, tags, body, id, createdAt, updatedAt
    };

    // save newNote in notes array
    const isSuccess = notes.push(newNote);

    if (isSuccess) {
        const response = h.response({
            status: 'success',
            message: 'Note added successfully',
            data: {
                noteId: id,
            },
        });
        response.code(201);
        return response;
    }

    const response = h.response({
        status: 'error',
        message: 'Something went wrong',
    });
    response.code(500);
    return response;
};

const getALlNotesHandler = () => ({
    status: 'success',
    data: {
        notes
    }
})


const getNoteByIdHandler = (request, h) => {
    const { id } = request.params;
    const note = notes.filter(note => note.id === id)[0];

    if (note !== undefined) {
        return {
            status: 'success',
            data: {
                note
            }
        }
    }

    const response = h.response({
        status: 'error',
        message: 'Note not found',
    });
    response.code(404);
    return response;
};

const editNoteByIdHandler = (request, h) => {
    const { id } = request.params;
    const { title, tags, body } = request.payload;
    const updateAt = new Date().toISOString();
    // find index array of note
    const index = notes.findIndex((note) => note.id === id)

    if (index !== -1) {
        notes[index] = {
            ...notes[index],
            title,
            tags,
            body,
            updateAt
        }

        const response = h.response({
            status: 'success',
            message: 'Note updated successfully',
        })
        response.code(200)
        return response;
    }

    const response = h.response({
        status: 'error',
        message: 'Note not found',
    })
    response.code(404);
    return response;
}

const deleteNoteByIdHandler = (request, h) => {
    const { id } = request.params;

    const index = notes.findIndex((note) => note.id === id);

    if (index !== -1) {
        notes.splice(index, 1);
        const response = h.response({
            status: 'success',
            message: 'Note deleted successfully',
        });
        response.code(200);
        return response;
    }

    const response = h.response({
        status: 'error',
        message: 'Note not found',
    });
    response.code(404);
    return response;
};

module.exports = {
    addNoteHandler, getALlNotesHandler, getNoteByIdHandler, editNoteByIdHandler, deleteNoteByIdHandler
}