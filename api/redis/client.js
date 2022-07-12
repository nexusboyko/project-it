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

export async function loadProject() {
  const project = await jsongetAsync('card');

  return project;
}

// Load item from a Redis list,
// then get the associated JSON and return it
export async function loadList() {
  const list = await zrevrangeAsync('cards', 0, -1);
  return list;
}

export async function loadListItem(index) {
  const listItem = await zrangeAsync('cards', index, index);
  return listItem;
}