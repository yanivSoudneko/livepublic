// import { httpService } from './http.service';
import { storageService } from './async-storage.service';
import stayJson from '../../data/stayMockData.json';
import locationsJson from '../../data/locationsMockData.json';

export const stayService = {
    queryStays,
    queryLocations,
    getStayById,
};

const STAY_KEY = 'stays';
const LOCATION_KEY = 'locations';

(async () => {
    console.log('hello??');
    const stays = await storageService.query(STAY_KEY);
    if (!stays.length) {
        localStorage.setItem(STAY_KEY, JSON.stringify(stayJson));
    }

    const locations = await storageService.query(LOCATION_KEY);
    if (!locations.length) {
        localStorage.setItem(LOCATION_KEY, JSON.stringify(locationsJson));
    }
})().catch((err) => {
    console.error('error initialising data!', err);
});

function queryStays(filterBy) {
    return storageService.query(STAY_KEY).then((stays) => {
        if (!filterBy) return stays;
        console.log(
            '🚀 ~ file: stay.service.js ~ line 31 ~ queryStays ~ filterBy',
            filterBy
        );
        const { filterTxt, checkIn, checkOut, guestCount } = filterBy;
        //TODO:add dates mockdata
        const filteredStays = stays.filter((stay) => {
            let searchTxt = filterTxt.toLowerCase();
            let address = stay.loc.address.toLowerCase();
            let capacity = stay.accommodates;
            return address.includes(searchTxt) && capacity >= guestCount;
        });
        console.log(filteredStays);
        return filteredStays;
    });
}
function queryLocations() {
    return storageService.query(LOCATION_KEY);
}
function getStayById(stayId) {
    return storageService.get(STAY_KEY, stayId);
}
