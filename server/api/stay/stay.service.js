const dbService = require('../../services/db.service');
const logger = require('../../services/logger.service');
// const reviewService = require('../review/review.service');
const ObjectId = require('mongodb').ObjectId;
const STAY_COLLECTION = 'stay';

module.exports = {
    query,
    getById,
    remove,
    update,
    add,
};

async function query(filterBy = {}) {
    // const criteria = _buildCriteria(filterBy);
    const criteria = filterBy;

    try {
        const collection = await dbService.getCollection(STAY_COLLECTION);
        var stays = await collection.find(criteria).toArray();
        stays = stays.map((stay) => {
            stay.createdAt = ObjectId(stay._id).getTimestamp();
            return stay;
        });
        return stays;
    } catch (err) {
        logger.error('cannot find stays', err);
        throw err;
    }
}

async function getById(stayId) {
    try {
        const collection = await dbService.getCollection(STAY_COLLECTION);
        const stay = await collection.findOne({ _id: ObjectId(stayId) });
        return stay;
    } catch (err) {
        logger.error(`while finding stay ${stayId}`, err);
        throw err;
    }
}

async function remove(stayId) {
    try {
        return { msg: 'not ready yet' };
        const collection = await dbService.getCollection(STAY_COLLECTION);
        await collection.deleteOne({ _id: ObjectId(stayId) });
    } catch (err) {
        logger.error(`cannot remove stay ${stayId}`, err);
        throw err;
    }
}

async function update(stay) {
    try {
        return { msg: 'not ready yet' };
        // // peek only updatable fields!
        // const _id = ObjectId(stay._id);
        // const stayToSave = {
        //     stayname: stay.stayname,
        //     fullname: stay.fullname,
        //     password: stay.password,
        //     imgUrl: stay.imgUrl,
        // };
        // const collection = await dbService.getCollection(STAY_COLLECTION);
        // await collection.updateOne({ _id }, { $set: stayToSave });
        // return stayToSave;
    } catch (err) {
        logger.error(`cannot update stay ${stay._id}`, err);
        throw err;
    }
}

async function add(stay) {
    try {
        return { msg: 'not ready yet' };
        // // peek only updatable fields!
        // const stayToAdd = {
        //     stayname: stay.stayname,
        //     password: stay.password,
        //     fullname: stay.fullname,
        //     imgUrl: stay.imgUrl,
        // };
        // const collection = await dbService.getCollection(STAY_COLLECTION);
        // await collection.insertOne(stayToAdd);
        // return stayToAdd;
    } catch (err) {
        logger.error('cannot insert stay', err);
        throw err;
    }
}

function _buildCriteria(filterBy) {
    const criteria = {};

    const {
        filterTxt,
        checkIn,
        checkOut,
        guestCount,
        rating,
        page,
        size,
        type,
    } = filterBy;

    if (filterTxt && filterTxt !== '') {
        const txtCriteria = { $regex: filterTxt, $options: 'i' };
        criteria.$or = [
            {
                stayname: txtCriteria,
            },
            {
                fullname: txtCriteria,
            },
        ];
    }
    if (filterBy.minBalance) {
        criteria.balance = { $gte: filterBy.minBalance };
    }
    return criteria;
}
