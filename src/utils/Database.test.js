//jest ./src/utils/Database

require('dotenv').config();
const Database = require('./Database');

test('getLastRecord', done => {

    function callback(data) {
        try {
            expect(data.length > 0).toBe(true);
            done();
        } catch (error) {
            done(error);
        }
    }

    Database.getLastRecord(callback);
});