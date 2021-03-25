const dbService = require('../../services/db.service');
const logger = require('../../services/logger.service');
const ObjectId = require('mongodb').ObjectId;
const ORDER_COLLECTION = 'order';

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
            page = !isNaN(page) && page >= 0 ? page : 1;
            size = !isNaN(size) && size >= 0 ? size : 1;
            aggregation.push({ $skip: page * size });
            aggregation.push({ $limit: size });
        }
        console.log('aggregation---27', JSON.stringify(aggregation));
        const collection = await dbService.getCollection(ORDER_COLLECTION);
        var orders = await collection.aggregate(aggregation).toArray();

        orders = orders.map((order) => {
            order.createdAt = ObjectId(order._id).getTimestamp();
            order.price = order.price ? order.price : 50;
            return order;
        });

        return orders;
    } catch (err) {
        logger.error('cannot find orders', err);
        throw err;
    }
}

async function getById(orderId) {
    try {
        const collection = await dbService.getCollection(ORDER_COLLECTION);
        const order = await collection.findOne({ _id: ObjectId(orderId) });
        return order;
    } catch (err) {
        logger.error(`while finding order ${orderId}`, err);
        throw err;
    }
}

async function remove(orderId) {
    try {
        const collection = await dbService.getCollection(ORDER_COLLECTION);
        await collection.deleteOne({ _id: ObjectId(orderId) });
    } catch (err) {
        logger.error(`cannot remove order ${orderId}`, err);
        throw err;
    }
}

async function update(order, id) {
    try {
        const _id = ObjectId(id);
        delete order._id;
        const collection = await dbService.getCollection(ORDER_COLLECTION);
        const updatedorder = await collection.updateOne(
            { _id },
            { $set: order },
            { returnOriginal: false }
        );
        return updatedorder;
    } catch (err) {
        logger.error(`cannot update order ${order._id}`, err);
        console.error(`cannot update order ${order._id}`, err);
        throw err;
    }
}

async function add(order) {
    try {
        const collection = await dbService.getCollection(ORDER_COLLECTION);
        await collection.insertOne(order);
        return order;
    } catch (err) {
        logger.error('cannot insert order', err);
        throw err;
    }
}

function _buildCriteria(criteria) {
    const { checkIn, checkOut, guestCount, stayId } = criteria;

    var filterBy = {
        checkIn,
        checkOut,
        guestCount,
        stayId,
        hostId,
        guestId,
    };

    console.log(
        '🚀 ~ file: order.service.js ~ line 120 ~ _buildCriteria ~ filterBy',
        filterBy
    );

    for (const key in filterBy) {
        if (
            filterBy[key] === undefined ||
            filterBy[key] === null ||
            filterBy[key] === ''
        ) {
            delete filterBy[key];
        }
    }

    const aggregation = [];

    for (const key in filterBy) {
        const value = filterBy[key];
        console.log(key, value);

        if (key === 'checkIn' && value) {
            aggregation.push({
                $match: {
                    checkIn: { $gte: new Date(checkIn) },
                },
            });
        }
        if (key === 'checkOut' && value) {
            aggregation.push({
                $match: {
                    checkOut: { $lte: new Date(checkOut) },
                },
            });
        }

        const keys = ['guestCount', 'stayId', 'hostId', 'guestId'];

        if (keys.includes(key) && value) {
            aggregation.push({
                $match: {
                    [key]: value,
                },
            });
        }
    }

    console.log(
        'criteria:',
        JSON.stringify(criteria, null, 2),
        'filterBy:',
        JSON.stringify(filterBy, null, 2),
        'aggregation:',
        JSON.stringify(aggregation, null, 2)
    );

    return aggregation;
}

// function isDate(date) {
//     return (new Date(date) !== "Invalid Date") && !isNaN(new Date(date));
// }
