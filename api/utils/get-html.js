const cheerio = require('cheerio');
const axios = require('axios');

const getEtherscanHtml = async (address, page) => {
  const { data } = await axios.get(`https://etherscan.io/txs?a=${address}&p=${page + 1}`);
  return data;
};

const extractContent = (html) => {
  const $ = cheerio.load(html);
  const data = $('#paywall_mask tbody tr')
    .map((_, product) => {
      const $product = $(product);

      return {
        txHash: $product.find('.myFnExpandBox_searchVal').text(),
        method: $product.find('.u-label').text(),
        block: $product.find('.d-none a').text(),
        age: $product.find('.showAge span').text(),
        from: $product.find('span.hash-tag').text(),
        to: $product.find('a.hash-tag').text(),
        value: $product.find('td:nth-child(10)').text(),
        txFee: $product.find('.showTxnFee span').text(),
      };
    })
    .toArray();
  const pages = $('#ContentPlaceHolder1_pageRecords ul.pagination li:nth-child(3) strong:nth-child(2)').text();
  return { data, pages };
};
module.exports = { extractContent, getEtherscanHtml };
