const cacheFactory = (getKeyFn, redis) => (req, res, next) => {
  const key = getKeyFn(req, res);
  redis.get(key, (error, result) => {
    if (error) throw error;
    if (result !== null) {
      return res.json(JSON.parse(result));
    }
    return next();
  });
};
module.exports = { cacheFactory };
