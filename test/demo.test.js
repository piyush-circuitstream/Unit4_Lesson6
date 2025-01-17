import * as chai from 'chai'; // const chai = require('chai') - commonJS

const assert = chai.assert;
const expect = chai.expect;

//describe + it
describe('Sample demo tests', function () {
    describe('Demo tests using assert', function () {
        it('Valid test for checking length of string', function () {
            let name = "Piyush";
            assert.equal(name.length, 6, 'Length is not matched with expected output.')
        });

        it('Valid test for concatenation of two strings', function () {
            let result = 'Hello ' + 'World';
            assert.strictEqual(result, 'Hello World', 'Concatenation did not work!');
        });

        it('Valid test for conditional check', function () {
            let number = 5;
            assert.isTrue(number > 0);
        });

        it('Valid test for checking if number is part of array', function () {
            const arr = [1, 2, 3, 4];
            assert.include(arr, 3);
        });
    });

    describe('Demo tests using expect', function () {
        it('Valid test for checking length of string', function () {
            let name = "Piyush";
            expect(name).to.be.of.length(6);
        });

        it('Invalid test for checking length of string', function () {
            let name = "Piyush";
            expect(name).not.to.be.of.length(5);
        });

        it('Valid test for concatenation of two strings', function () {
            let result = 'Hello ' + 'World';
            //write test using expect
        });

        it('Valid test for conditional check', function () {
            let number = 5;

        });

        it('Valid test for checking if number is part of array', function () {
            const arr = [1, 2, 3, 4];

        });
    });
});