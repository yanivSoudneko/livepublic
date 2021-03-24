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
    try {
        var aggregation = _buildCriteria(filterBy);

        if (filterBy.hasOwnProperty('page') && filterBy.size) {
            var { page, size } = filterBy;
            page = !isNaN(page) && page > 0 ? page : 1;
            size = !isNaN(size) && size > 0 ? size : 1;
            // stays = _paginate(stays, filterBy.size, filterBy.page);
            aggregation.push({ $skip: page * size });
            aggregation.push({ $limit: size });
        }
        const collection = await dbService.getCollection(STAY_COLLECTION);
        var stays = await collection.aggregate(aggregation).toArray();

        stays = stays.map((stay) => {
            stay.createdAt = ObjectId(stay._id).getTimestamp();
            stay.price = stay.price ? stay.price : 50;
            console.log('stay:LINE 33', stay);
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

async function update(stay, id) {
    try {
        const _id = ObjectId(id);
        console.log('stay:', stay);
        delete stay._id;
        const collection = await dbService.getCollection(STAY_COLLECTION);
        const updatedStay = await collection.updateOne(
            { _id },
            { $set: stay },
            { returnOriginal: false }
        );
        return updatedStay;
    } catch (err) {
        logger.error(`cannot update stay ${stay._id}`, err);
        console.error(`cannot update stay ${stay._id}`, err);
        throw err;
    }
}

async function add(stay) {
    try {
        // return { msg: 'not ready yet' };
        // peek only updatable fields!
        const stayToAdd = {
            reviews: stay.review,
        };
        const collection = await dbService.getCollection(STAY_COLLECTION);
        await collection.insertOne(stayToAdd);
        return stayToAdd;
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

        if (key === 'rating') {
            aggregation.push({
                $match: {
                    'review_scores.review_scores_rating': {
                        $exists: true,
                        $nin: ['', null],
                    },
                },
            });
            aggregation.push({
                $sort: { 'review_scores.review_scores_rating': -1 },
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
