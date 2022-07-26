import { zrangeAsync, jsongetAsync } from './client.js';

// load item at index pos
export async function loadItemId(index) {
  const listItem = await zrangeAsync('items', index, index);
  return listItem;
}

// load item json given id
export async function loadItemJson(id) {
  const item = await jsongetAsync(id);
  return item;
}

// add item given id and data
export async function addItemJson(id, item) {
  await jsonsetAsync(id, '$', item);
}

// delete item
export async function delItemJson(id) {
  await jsondelAsync(id);
}
