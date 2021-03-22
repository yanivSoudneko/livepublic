// import { httpService } from './http.service';
import { storageService } from './async-storage.service';
import stayJson from '../../data/stayMockData.json';
import locationsJson from '../../data/locationsMockData.json';

export const stayService = {
    queryStays,
    queryLocations,
    getStayById,
    update,
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
    console.log(
        '🚀 ~ file: stay.service.js ~ line 31 ~ queryStays ~ filterBy',
        filterBy
    );
    return storageService.query(STAY_KEY).then((stays) => {
        if (!filterBy) return stays;

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
        var result;
        if (rating) {
            result = stays.sort((stay1, stay2) => {
                const rating1 = _getRating(stay1.reviews);
                const rating2 = _getRating(stay2.reviews);
                return rating2 - rating1;
            });
        }
        //TODO:add dates mockData
        result = stays.filter((stay) => {
            const searchTxt = filterTxt.toLowerCase();
            const address = stay.loc.address.toLowerCase();
            const capacity = stay.accommodates;
            var types = stay.type && stay.type.length ? stay.type : [];
            types = types.map((t) => t.toLowerCase());
            return (
                (address.includes(searchTxt) ||
                    types.includes(type.toLowerCase())) &&
                capacity >= guestCount
            );
        });
        console.log(result);
        result = _paginate(result, size, page);
        console.log(result);
        return result;
    });
}
function queryLocations() {
    return storageService.query(LOCATION_KEY);
}
function getStayById(stayId) {
    return storageService.get(STAY_KEY, stayId);
}

async function update(targetStay) {
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