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
        expect(book).to.have.property('isbn').that.equals('123456');
        expect(book).to.have.property('publisher').that.equals('XYZ');
        expect(book).to.have.property('inventory').that.equals(5);
        expect(book).to.have.property('unitsSold').that.equals(1);
        expect(book).to.have.property('tags').that.eql(['comic', 'bestseller']);
    });

    it('should not create a book without required fields', async () => {
        const bookData = {
            isbn: '1234567890',
            publisher: 'Test Publisher',
        };

        try {
            await Book.create(bookData);
        } catch (error) {
            expect(error.errors).to.have.property('title');
        }
    });

    it('should set default values for inventory and unitsSold', async () => {
        const bookData = {
            title: 'Default Book',
            isbn: '0987654321',
            publisher: 'Default Publisher',
        };

        const book = await Book.create(bookData);

        expect(book.inventory).to.equal(0);
        expect(book.unitsSold).to.equal(0);
    });

    it('should retrieve a book by ISBN', async () => {
        const bookData = {
            title: 'Find Me',
            isbn: '1122334455',
            publisher: 'Find Publisher',
        };

        const book = await Book.create(bookData);

        const foundBook = await Book.findOne({ isbn: '1122334455' });
        expect(foundBook).to.not.be.null;
        expect(foundBook).to.have.property('isbn').that.equals('1122334455');
    });
});

after(async function () {
    await mongoose.disconnect();
});
