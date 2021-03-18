// import { httpService } from './http.service';
import { storageService } from './async-storage.service';
import stayJson from '../../data/stayMockData.json';
import locationsJson from '../../data/locationsMockData.json';

export const reviewService = {
    queryStays,
    queryLocations,
    getStayById,
};

const STAY_KEY = 'stays';
const LOCATION_KEY = 'locations';

(async () => {
    if (!gStays) {
        const stays = await storageService.query(STAY_KEY);
        if (!stays) {
            localStorage.setItem(STAY_KEY, stayJson);
        }
    }
    if (!gLocations) {
        const locations = await storageService.query(LOCATION_KEY);
        if (!locations) {
            localStorage.setItem(LOCATION_KEY, locationsJson);
        }
    }
})().catch((err) => {
    console.error('error initialising data!', err);
});

function queryStays(filterBy) {
    return storageService.query(STAY_KEY);
}
function queryLocations() {
    return storageService.query(LOCATION_KEY);
}
function getStayById(stayId) {
    return storageService.get(STAY_KEY, stayId);
}
