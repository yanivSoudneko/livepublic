import { httpService } from './http.service';
import { storageService } from './async-storage.service';
import orderJson from '../../data/orderMockData.json';

export const orderService = { save, query, updateOrder };
const ORDER_KEY = 'order';
const END_POINT = '/order';

(async () => {
    const orders = await storageService.query(ORDER_KEY);
    if (!orders.length) {
        localStorage.setItem(ORDER_KEY, JSON.stringify(orderJson));
    }
})().catch((err) => {
    console.error('error initializing data!', err);
});


async function save(order) {
    try {
        const newOrder = await httpService.post(END_POINT, order);
        console.log(
            '🚀 ~ file: order.service.js ~ line 21 ~ save ~ newOrder',
            newOrder
        );
        return newOrder;
    } catch (error) {
        console.log(
            '🚀 ~ file: order.service.js ~ line 22 ~ save ~ error',
            error
        );
    }
}
function saveLocal(order) {
    console.log('order:', order);
    return storageService.post(ORDER_KEY, order);
}

async function query(filterBy) {
    // const { startDate, endDate } = filterBy;

    // var filters = {
    //     checkIn: startDate,
    //     checkOut: endDate,
    //     guestCount: 1,
    //     page: 0,
    //     size: 1,
    //     stayId: null,
    //     hostId: null,
    //     guestId: null,
    // };

    try {
        const res = await httpService.get(END_POINT, null, { filterBy });
        console.log('orders', res, filterBy);
        return res;
    } catch (error) {
        console.log(
            '🚀 ~ file: order.service.js ~ line 39 ~ query ~ error',
            error
        );
    }

    return storageService.query(ORDER_KEY);
}


async function updateOrder(order) {
    await httpService.put(`${END_POINT}/${order._id}`, order);
}