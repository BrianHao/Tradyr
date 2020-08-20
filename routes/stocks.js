const express = require("express");
const router = express.Router({ mergeParams: true });
const Stock = require("../models/stock");
const passport = require("../middleware/auth");
const User = require("../models/user");
const fetch = require("node-fetch");
const Transaction = require("../models/transaction");

// Logic for buying a stock
router.post("/buy", passport.isLoggedIn(), async function (req, res) {
  let symbol = req.body.symbol.toUpperCase();
  let quantity = req.body.quantity;

  // Get the current user
  let user = await User.findById(req.user.id)
    .populate("stocksOwned")
    .exec()
    .then(async (user) => {
      let quote = await getStockInfo(symbol);
      let price = quote.latestPrice * 100;
      let costOfPurchase = quantity * price;

      // Check if quantity to purchase is a valid amount
      if (quantity < 1) {
        throw new Error("Invalid quantity to purchase.");
      }

      // Check if user has enough cash on hand to complete the buy
      if (user.cash < costOfPurchase) {
        throw new Error(
          "You do not have enough cash to complete the transaction."
        );
      }

      // Deduct the money from the user
      user.cash = user.cash - costOfPurchase;

      // Get the stock ID for the stock owned by the user
      let ownedStockId = await checkUserOwnsStock(
        user.stocksOwned,
        symbol,
        user
      );

      // Update the stock quantity
      Stock.findById(ownedStockId)
        .then((stock) => {
          stock.quantity = stock.quantity + quantity;
          stock.save();
        })
        .then(() => {
          // Add the transaction to the user's transaction history
          let newTransaction = { symbol, quantity, price, isBuy: true };
          Transaction.create(newTransaction).then((createdTransaction) => {
            user.transactions.push(createdTransaction);
            user.save();
          });
        });

      // Return success message
      res
        .status(200)
        .json(
          "Successfully bought " +
            quantity +
            " shares of " +
            symbol +
            " for $" +
            costOfPurchase
        );
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

// Logic for selling a stock
router.post("/sell", passport.isLoggedIn(), async function (req, res) {
  const symbol = req.body.symbol;
  const quantity = req.body.quantity;
  let quote = await getStockInfo(symbol);
  let price = quote.latestPrice * 100;
});

// Get information for a single stock
async function getStockInfo(symbol) {
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

// Check if user has this stock in their list of stocks owned, if not, create it
function checkUserOwnsStock(stockList, symbol, user) {
  for (let stock of stockList) {
    if (stock.symbol === symbol) return stock._id;
  }
  let newStock = { symbol, quantity: 0 };
  Stock.create(newStock).then((createdStock) => {
    user.stocksOwned.push(createdStock);
    user.save();
    return createdStock._id;
  });
}

module.exports = router;
