const middleware = require('@blocklet/sdk/lib/middlewares');
const router = require('express').Router();
const { extractContent, getEtherscanHtml } = require('../utils/get-html');
const { cacheFactory } = require('../middlewares/cache');
const redisIns = require('../libs/redis');
const etherscanValidate = require('../validators/etherscan.validator');

const getEtherscanKey = (req) => {
  const { a, page } = req.query;
  const key = `${a}-${page}`;
  return key;
};
router.use('/user', middleware.user(), (req, res) => res.json(req.user || {}));

router.use('/txs', cacheFactory(getEtherscanKey, redisIns), async (req, res) => {
  const { page = 0, a: address } = req.query;
  const errors = etherscanValidate(address, page);
  if (errors.length > 0) {
    return res.json({ errorCode: 400, errors });
  }
  const ethers = await getEtherscanHtml(address, page);
  const isMatching = !/There are no matching entries/gi.test(ethers);
  const data = isMatching ? extractContent(ethers) : [];
  if (isMatching) {
    const str = JSON.stringify(data);
    redisIns.set(getEtherscanKey(req), str, 'ex', 15);
  }
  return res.json(data || { pages: 0, data: [] });
});

module.exports = router;
