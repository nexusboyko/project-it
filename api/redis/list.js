import { zaddAsync, zremAsync, zcountAsync, zrangeAsync } from './client.js';

// get num of items in list
export async function getItemCount() {
  const count = await zcountAsync('items', '-inf', 'inf');
  return count;
}

// load entire list
export async function loadList() {
  const list = await zrangeAsync('items', 0, -1);
  return list;
}

// add item to list given id
export async function addItemID(id) {
  await zaddAsync('items', Math.round(Date.now() / 1000), id);
}

// del item from list given id
export async function delItemID(id) {
  await zremAsync('items', id);
}
