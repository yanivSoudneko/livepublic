// import { httpService } from './http.service';
import { storageService } from './async-storage.service';
import orderJson from '../../data/orderMockData.json';

export const orderService = { save, queryOrders };
const ORDER_KEY = 'orders';

(async () => {
  const orders = await storageService.query(ORDER_KEY);
  if (!orders.length) {
    localStorage.setItem(ORDER_KEY, JSON.stringify(orderJson));
  }
})().catch(err => {
  console.error('error initializing data!', err);
});

function save(order) {
  console.log('order:', order);
  return storageService.post(ORDER_KEY, order);
}

function queryOrders() {
  return storageService.query(ORDER_KEY);
}
