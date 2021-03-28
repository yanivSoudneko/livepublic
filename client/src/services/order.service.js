import { httpService } from './http.service';
import { storageService } from './async-storage.service';

export const orderService = { save, query, updateOrder };
const ORDER_KEY = 'order';
const END_POINT = '/order';

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

async function query(filterBy) {
    try {
        console.log("🚀 ~ file: order.service.js ~ line 25 ~ query ~ filterBy", JSON.stringify(filterBy))
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
    try {
        const res = await httpService.put(`${END_POINT}/${order._id}`, order);
        return res
    } catch (error) {
        console.log("🚀 ~ file: order.service.js ~ line 73 ~ updateOrder ~ error", error)

    }
}