const stayService = require('./stay.service');
const logger = require('../../services/logger.service');

async function getStay(req, res) {
    try {
        const stay = await stayService.getById(req.params.id);
        res.send(stay);
    } catch (err) {
        logger.error('Failed to get Stay', err);
        res.status(500).send({ err: 'Failed to get Stay' });
    }
}

async function getStays(req, res) {
    try {
        const filterBy = {};
        // const filterBy = {
        //     txt: req.query?.txt || '',
        // };
        const stays = await stayService.query(filterBy);
        res.send(stays);
    } catch (err) {
        logger.error('Failed to get Stays', err);
        res.status(500).send({ err: 'Failed to get Stays' });
    }
}

async function deleteStay(req, res) {
    try {
        await stayService.remove(req.params.id);
        res.send({ msg: 'Deleted successfully' });
    } catch (err) {
        logger.error('Failed to delete Stay', err);
        res.status(500).send({ err: 'Failed to delete Stay' });
    }
}

async function updateStay(req, res) {
    try {
        const Stay = req.body;
        const savedStay = await stayService.update(Stay);
        res.send(savedStay);
    } catch (err) {
        logger.error('Failed to update Stay', err);
        res.status(500).send({ err: 'Failed to update Stay' });
    }
}

function _buildCriteria(filterBy) {
    // debugger;
    const aggregateFilter = { $match: {} };
    for (const key in filterBy) {
        const payload = filterBy[key];
        if (payload.hasOwnProperty('text')) {
            aggregateFilter.$match[key] = { $regex: payload.text };
        }
        if (payload.hasOwnProperty('bool')) {
            aggregateFilter.$match[key] = payload.bool;
        }
        if (key === 'created_at') {
            const { start, end } = filterBy[key];
            aggregateFilter.$match[key] = {};
            if (start) {
                aggregateFilter.$match[key].$gte = start;
            }
            if (end) {
                aggregateFilter.$match[key].$lt = end;
            }
        }
        if (key === 'sortBy') {
            const { field } = filterBy[key];
            aggregateFilter.$sort = {};
            aggregateFilter.$sort[field] = 1;
        }
        if (key === 'limit') {
            const { page, limit } = filterBy;
            aggregateFilter.$skip = page > 0 ? (page - 1) * limit : 0;
            aggregateFilter.$limit = limit;
        }
    }
    const { $match, $sort, $skip, $limit } = aggregateFilter;
    const aggregate = [{ $match }, { $sort }, { $skip }, { $limit }];
    return aggregate;
}

module.exports = {
    getStay,
    getStays,
    deleteStay,
    updateStay,
};
