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

async function query(filterBy) {
    const aggregation = _buildCriteria(filterBy);
    try {
        const collection = await dbService.getCollection(STAY_COLLECTION);
        var stays = await collection.aggregate(aggregation).toArray();

        stays = stays.map((stay) => {
            stay.createdAt = ObjectId(stay._id).getTimestamp();
            return stay;
        });

        if (filterBy.rating) {
            stays = stays.sort((stay1, stay2) => {
                const rating1 = _getRating(stay1.reviews);
                const rating2 = _getRating(stay2.reviews);
                return rating2 - rating1;
            });
        }

        if (filterBy.hasOwnProperty('page') && filterBy.size) {
            stays = _paginate(stays, filterBy.size, filterBy.page);
        }

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

function _buildCriteria(criteria) {
    const {
        filterTxt,
        // checkIn,
        // checkOut,
        guestCount,
        type,
    } = criteria;

    const filterBy = {
        filterTxt,
        type,
        guestCount,
    };
    console.log(
        '🚀 ~ file: stay.service.js ~ line 120 ~ _buildCriteria ~ filterBy',
        filterBy
    );
    const aggregation = [];
    for (const key in filterBy) {
        const value = filterBy[key];
        console.log(key, value);
        if (key === 'filterTxt' && value) {
            aggregation.push({
                $match: {
                    'loc.address': {
                        $regex: value,
                        $options: 'i',
                    },
                },
            });
        }

        if (key === 'type' && value) {
            aggregation.push({
                $match: {
                    type: {
                        $regex: value,
                        $options: 'i',
                    },
                },
            });
        }

        if (key === 'guestCount' && value) {
            aggregation.push({
                $match: {
                    accommodates: {
                        $gte: value,
                    },
                },
            });
        }
    }
    return aggregation;
}

function _getRating(reviews) {
    const totalReviews = reviews.length;
    const ratingSum = reviews.reduce((acc, review) => {
        acc += review.rating;
    }, 0);
    return ratingSum / totalReviews;
}

function _paginate(array, page_size, page_number) {
    return array.slice((page_number - 1) * page_size, page_number * page_size);
}
