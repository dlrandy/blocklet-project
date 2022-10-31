const middleware = require('@blocklet/sdk/lib/middlewares');
const router = require('express').Router();
const { extractContent, getEtherscanHtml } = require('../utils/get-html');

router.use('/user', middleware.user(), (req, res) => res.json(req.user || {}));
router.use('/txs', async (req, res) => {
  const { page, a: address } = req.query;
  const ethers = await getEtherscanHtml(address, page);

  res.json(extractContent(ethers) || []);
});

module.exports = router;
