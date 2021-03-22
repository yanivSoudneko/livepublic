const MongoClient = require('mongodb').MongoClient;
const logger = require('./logger.service');
const config = require('../config');

module.exports = {
    getCollection,
};

// Database Name
const dbName = process.env.DB_NAME;

var dbConn = null;

async function getCollection(collectionName) {
    try {
        const db = await _connect();
        const collection = await db.collection(collectionName);
        console.log(
            '🚀 ~ file: db.service.js ~ line 18 ~ getCollection ~ collection',
            collection
        );
        return collection;
    } catch (err) {
        logger.error('Failed to get Mongo collection', err);
        throw err;
    }
}

async function _connect() {
    if (dbConn) return dbConn;
    try {
        console.log({ dbUrl: config.dbURL });
        const client = await MongoClient.connect(config.dbURL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        const db = client.db(dbName);
        dbConn = db;
        return db;
    } catch (err) {
        logger.error('Cannot Connect to DB', err);
        throw err;
    }
}
