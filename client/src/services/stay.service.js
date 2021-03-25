import { httpService } from './http.service';
import { storageService } from './async-storage.service';
import stayJson from '../../data/stayMockData.json';
import locationsJson from '../../data/locationsMockData.json';

export const stayService = {
    queryStays,
    queryLocations,
    getStayById,
    update,
    add,
};

const STAY_KEY = 'stays';
const LOCATION_KEY = 'locations';

const END_POINT = '/stay';

(async () => {
    const locations = await storageService.query(LOCATION_KEY);
    if (!locations.length) {
        localStorage.setItem(LOCATION_KEY, JSON.stringify(locationsJson));
    }
})().catch((err) => {
    console.error('error initialising data!', err);
});

async function queryStays(filterBy = {}) {
    try {
        console.log(
            '🚀 ~ file: stay.service.js ~ line 31 ~ queryStays ~ filterBy',
            JSON.stringify(filterBy)
        );
        const res = await httpService.get(END_POINT, null, { filterBy });
        console.log(
            '🚀 ~ file: stay.service.js ~ line 43 ~ queryStays ~ res',
            res
        );
        return res;
    } catch (error) {
        console.log(error);
    }
}

function queryLocations() {
    return storageService.query(LOCATION_KEY);
}

async function getStayById(stayId) {
    try {
        const res = await httpService.get(END_POINT + '/' + stayId);
        console.log(
            '🚀 ~ file: stay.service.js ~ line 43 ~ queryStays ~ res',
            res
        );
        return res;
    } catch (error) {
        console.log(error);
    }
}

async function add(stay) {
    try {
        const newStay = await httpService.post(
            END_POINT + '/' + stay._id,
            stay
        );
        return newStay;
    } catch (error) {
        console.log(
            '🚀 ~ file: stay.service.js ~ line 85 ~ update ~ error',
            error
        );
    }
}
async function update(stay) {
    try {
        const updatedStay = await httpService.put(
            END_POINT + '/' + stay._id,
            stay
        );
        console.log(
            '🚀 ~ file: stay.service.js ~ line 92 ~ update ~ updatedStay',
            updatedStay
        );
        return updatedStay;
    } catch (error) {
        console.log(
            '🚀 ~ file: stay.service.js ~ line 85 ~ update ~ error',
            error
        );
    }
}

async function updateLocal(targetStay) {
    try {
        const updatedStay = await storageService.put(STAY_KEY, targetStay);
        return updatedStay;
    } catch (error) {
        console.log(
            '🚀 ~ file: stay.service.js ~ line 85 ~ update ~ error',
            error
        );
    }
}
