import { httpService } from './http.service';
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

const END_POINT = '/stay';

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
})().catch(err => {
  console.error('error initialising data!', err);
});

async function queryStays(filterBy = {}) {
  try {
    console.log('🚀 ~ file: stay.service.js ~ line 31 ~ queryStays ~ filterBy', JSON.stringify(filterBy));

    const res = await httpService.get(END_POINT, null, { filterBy });
    console.log('🚀 ~ file: stay.service.js ~ line 43 ~ queryStays ~ res', res);
    return res;
  } catch (error) {
    console.log(error);
  }
}

function queryStaysLocal(filterBy) {
  console.log('🚀 ~ file: stay.service.js ~ line 31 ~ queryStays ~ filterBy', filterBy);
  return storageService.query(STAY_KEY).then(stays => {
    if (!filterBy) return stays;

    const { filterTxt, checkIn, checkOut, guestCount, rating, page, size, type } = filterBy;
    var result;
    if (rating) {
      result = stays.sort((stay1, stay2) => {
        const rating1 = _getRating(stay1.reviews);
        const rating2 = _getRating(stay2.reviews);
        return rating2 - rating1;
      });
    }
    //TODO:add dates mockData
    result = stays.filter(stay => {
      const searchTxt = filterTxt.toLowerCase();
      const address = stay.loc.address.toLowerCase();
      const capacity = stay.accommodates;
      var types = stay.type && stay.type.length ? stay.type : [];
      types = types.map(t => t.toLowerCase());
      return (address.includes(searchTxt) || types.includes(type.toLowerCase())) && capacity >= guestCount;
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

async function getStayById(stayId) {
  try {
    const res = await httpService.get(END_POINT + '/' + stayId);
    console.log('🚀 ~ file: stay.service.js ~ line 43 ~ queryStays ~ res', res);
    return res;
  } catch (error) {
    console.log(error);
  }
}

async function update(stay) {
  try {
    const updatedStay = await httpService.put(END_POINT + '/' + stay._id, stay);
    console.log('🚀 ~ file: stay.service.js ~ line 92 ~ update ~ updatedStay', updatedStay);
    return updatedStay;
  } catch (error) {
    console.log('🚀 ~ file: stay.service.js ~ line 85 ~ update ~ error', error);
  }
}

async function updateLocal(targetStay) {
  try {
    const updatedStay = await storageService.put(STAY_KEY, targetStay);
    return updatedStay;
  } catch (error) {
    console.log('🚀 ~ file: stay.service.js ~ line 85 ~ update ~ error', error);
  }
}

// function _getRating(reviews) {
//     const totalReviews = reviews.length;
//     const ratingSum = reviews.reduce((acc, review) => {
//         acc += review.rating;
//     }, 0);
//     return ratingSum / totalReviews;
// }

// function _paginate(array, page_size, page_number) {
//     return array.slice((page_number - 1) * page_size, page_number * page_size);
// }
