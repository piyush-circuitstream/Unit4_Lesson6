import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    isbn: {
        type: String,
        required: true
    },
    publisher: {
        type: String,
        required: true
    },
    inventory: {
        type: Number,
        required: false,
        default: 0
    },
    unitsSold: {
        type: Number,
        required: false,
        default: 0
    },
    tags: {
        type: [String],
        required: false
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    }
});

const Book = mongoose.model('Book', bookSchema);

export { Book };