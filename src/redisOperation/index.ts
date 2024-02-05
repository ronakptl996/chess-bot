import global from "../global";

const Get = async (key: string) => {
  let data = await global.redisClient.get(key);
  return JSON.parse(data);
};

const Set = async (key: string, data: any) => {
  return await global.redisClient.set(key, JSON.stringify(data));
};

const Del = async (key: string) => {
  return await global.redisClient.del(key);
};

export { Get, Set, Del };
