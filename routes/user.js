const express = require("express");
const router = express.Router({ mergeParams: true });
const passport = require("passport");
const middleware = require("../middleware/auth");
const User = require("../models/user");
const fetch = require("node-fetch");

// Get user's profile
router.get("/:id", middleware.loggedIn(), async function (req, res) {
  let demo = [
    { ticker: "aapl", quantity: 4 },
    { ticker: "msft", quantity: 3 },
    { ticker: "goog", quantity: 0 },
  ];

  User.findById(req.user.id)
    .then(async (user) => {
      const profile = {};
      profile.user = user;
      profile.stockPrices = await getStockPrices(demo);

      res.json(profile);
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

// Gets current stock prices for stocks owned by user
async function getStockPrices(stocks) {
  let stockArray = [];

  for (const stock of stocks) {
    if (stock.quantity > 0) {
      let quote = await getCurrQuote(stock.ticker);
      //let prev = await getPrevQuote(stock.ticker);
      stock.latestPrice = quote.latestPrice;
      stock.openPrice = quote.open;
      stock.close = quote.close;
      stock.prevClose = quote.previousClose;

      stockArray.push(stock);
      // stockArray.push(fetch(url).then((response) => response.json()));
    }
  }
  return Promise.all(stockArray);
}

async function getCurrQuote(ticker) {
  let url =
    "https://cloud.iexapis.com/stable/stock/" +
    ticker +
    "/quote?token=" +
    process.env.IEX_APITOKEN;

  let currPrice = await fetch(url);
  return currPrice.json();
}

// async function getPrevQuote(ticker) {
//   let url =
//     "https://cloud.iexapis.com/stable/stock/" +
//     ticker +
//     "/previous?token=" +
//     process.env.IEX_APITOKEN;

//   let prevPrice = await fetch(url);
//   return prevPrice.json();
// }

module.exports = router;
