// Routes to get user information

const express = require("express");
const router = express.Router({ mergeParams: true });
const passport = require("../middleware/auth");
const User = require("../models/user");
const fetch = require("node-fetch");

// Get user's profile, including current information on all stocks owned
router.get("/profile", async function (req, res) {
  let user = await User.findById(req.user.id)
    .populate("stocksOwned")
    .exec()
    .then((user) => {
      getStockInfo(user.stocksOwned).then((stockInfo) => {
        res.status(200).json({ status: 200, user: user, stockInfo: stockInfo });
      });
    })
    .catch((err) =>
      res.status(400).json({ status: 400, message: "Unable to load profile." })
    );
});

// Compile latest stock information for all stocks owned by user
async function getStockInfo(stocks) {
  return Promise.all(
    stocks.map(async (stock) => {
      let quote = await getStockQuote(stock.symbol);
      let stockObj = {
        symbol: stock.symbol,
        quantity: stock.quantity,
        latestPrice: quote.latestPrice,
        companyName: quote.companyName,
        open: quote.open,
        close: quote.close,
        previousClose: quote.previousClose,
      };
      return stockObj;
    })
  );
}

// Get information for a single stock
async function getStockQuote(symbol) {
  const url =
    "https://cloud.iexapis.com/stable/stock/" +
    symbol +
    "/quote?token=" +
    process.env.IEX_APITOKEN;

  let stockQuote = await fetch(url).catch(() => {
    console.log("Error in fetching stock prices");
  });
  return stockQuote.json();
}

module.exports = router;
