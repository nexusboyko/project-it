import redis from 'redis';
import rejson from 'redis-rejson';
import { promisify } from 'util';

rejson(redis);
export const client = redis.createClient();
export const jsonsetAsync = promisify(client.json_set).bind(client);
export const jsongetAsync = promisify(client.json_get).bind(client);

export async function loadProject() {
  const project = await jsongetAsync('card');

  return project;
}