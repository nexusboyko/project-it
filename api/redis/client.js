import redis from 'redis';
import rejson from 'redis-rejson';
import { promisify } from 'util';

rejson(redis);
export const client = redis.createClient();
export const jsonsetAsync = promisify(client.json_set).bind(client);
export const jsongetAsync = promisify(client.json_get).bind(client);

export const smembersAsync = promisify(client.smembers).bind(client);
export const saddAsync = promisify(client.sadd).bind(client);
export const sremAsync = promisify(client.srem).bind(client);

export const zaddAsync = promisify(client.zadd).bind(client);
export const zcardAsync = promisify(client.zcard).bind(client);
export const zincrbyAsync = promisify(client.zincrby).bind(client);
export const zremAsync = promisify(client.zrem).bind(client);
export const zscoreAsync = promisify(client.zscore).bind(client);
export const zrevrangeAsync = promisify(client.zrevrange).bind(client);
export const zrangeAsync = promisify(client.zrevrange).bind(client);
export const zcountAsync = promisify(client.zcount).bind(client);

export async function getItemCount() {
  const count = await zcountAsync('cards', '-inf', 'inf');
  return count;
}

export async function loadList() {
  const list = await zrangeAsync('cards', 0, -1);
  return list;
}

export async function loadListItem(index) {
  const listItem = await zrangeAsync('cards', index, index);
  return listItem;
}

export async function loadItemJson(id) {
  const item = await jsongetAsync(id);
  return item;
}

export async function addItemJson(id, item) {
  await jsonsetAsync(id, '$', item);
}

export async function addItemID(id) {
  await zaddAsync('cards', Math.round(Date.now() / 1000), id);
}