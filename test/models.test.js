import * as chai from 'chai';
import { Book } from '../models.js';
import mongoose from 'mongoose';
import chaiAsPromised from 'chai-as-promised';

chai.use(chaiAsPromised);

const expect = chai.expect;

const mongoDBURI = 'mongodb://localhost:27017/bookstore-test';

before(function () {
    mongoose.connect(mongoDBURI);
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'Error on DB connection'));
    db.once('open', function () {
        console.log('DB connected!');
        return mongoose.connection.db.dropDatabase();
    });
});

describe('Tests for create book', function () {
    it('Valid book creation', async function () {
        const bookData = {
            title: 'Title1',
            isbn: '123456',
            publisher: 'XYZ',
            inventory: 5,
            unitsSold: 1,
            tags: ['comic', 'bestseller']
        };

        const book = await Book.create(bookData); // new Book({...}); book.save()

        expect(book).to.have.property('title').that.equals('Title1');
    });
});

after(async function () {
    await mongoose.disconnect();
});
