const middleware = require('@blocklet/sdk/lib/middlewares');
const router = require('express').Router();
const { extractContent, getEtherscanHtml } = require('../utils/get-html');
const { redis, cacheFactory } = require('../middlewares/cache');

const getEtherscanKey = (req) => {
  const { a, page } = req.query;
  const key = `${a}-${page}`;
  return key;
};
router.use('/user', middleware.user(), (req, res) => res.json(req.user || {}));
router.use('/txs', cacheFactory(getEtherscanKey), async (req, res) => {
  const { page, a: address } = req.query;
  const ethers = await getEtherscanHtml(address, page);
  const data = extractContent(ethers);
  if (data) {
    redis.set(getEtherscanKey(req), JSON.stringify(data), 'ex', 15);
  }
  res.json(data || []);
});

module.exports = router;
