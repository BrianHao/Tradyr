// Routes for stock buying and selling

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
  let price;
  let costOfPurchase;

  // Get the current user
  let user = await User.findById(req.user.id)
    .populate("stocksOwned")
    .exec()
    .then(async (user) => {
      let quote = await getStockInfo(symbol);
      price = quote.latestPrice * 100;
      costOfPurchase = quantity * price;

      // Check if quantity to purchase is a valid amount
      if (quantity < 1) {
        throw new Error("Invalid quantity.");
      }

      // Check if user has enough cash on hand to complete the buy
      if (user.cash < costOfPurchase) {
        throw new Error("Not enough cash.");
      }
      // Get the stock ID for the stock owned by the user
      let ownedStockId = await checkUserOwnsStock(
        user.stocksOwned,
        symbol,
        user
      );
      return { ownedStockId, user };
    })
    .then(async (data) => {
      let stock = await Stock.findById(data.ownedStockId);
      return { stock: stock, user: data.user };
    })
    .then((data) => {
      // Update the stock's quantity
      data.stock.quantity = data.stock.quantity + quantity;
      data.stock.save();
      return data.user;
    })
    .then(async (user) => {
      // Create the log for this transaction
      let newTransaction = { symbol, quantity, price, isBuy: true };
      let transaction = await Transaction.create(newTransaction);
      return { user: user, transaction: transaction };
    })
    .then((data) => {
      // Add the transaction to the user's transactions history
      data.user.transactions.push(data.transaction);
      // Deduct the money from the user
      data.user.cash = data.user.cash - costOfPurchase;
      data.user.save();
    })
    .then(() =>
      // Return success message
      res.status(200).json({
        status: 200,
        message:
          "Successfully bought " +
          quantity +
          " share(s) of " +
          symbol +
          " for $" +
          costOfPurchase / 100,
      })
    )
    .catch((err) => {
      if (err.message.length > 20) {
        err.message = "Invalid stock symbol.";
      }
      return res.status(400).json({
        status: 400,
        message: err.message,
      });
    });
});

// Logic for selling a stock
router.post("/sell", passport.isLoggedIn(), async function (req, res) {
  let symbol = req.body.symbol.toUpperCase();
  let quantity = req.body.quantity;

  // Get the current user
  let user = await User.findById(req.user.id)
    .populate("stocksOwned")
    .exec()
    .then(async (user) => {
      let quote = await getStockInfo(symbol);
      let price = quote.latestPrice * 100;
      let costOfSale = quantity * price;

      // Check if quantity to purchase is a valid amount
      if (quantity < 1) {
        throw new Error("Invalid quantity.");
      }

      // Get the stock ID for the stock owned by the user
      let ownedStockId = await checkUserOwnsStock(
        user.stocksOwned,
        symbol,
        user
      );

      // Update the stock quantity
      Stock.findById(ownedStockId)
        .then((stock) => {
          if (stock.quantity < quantity) {
            throw new Error("Not enough shares.");
          }
          stock.quantity = stock.quantity - quantity;
          stock.save();
        })
        .then(() => {
          // Add the transaction to the user's transaction history
          let newTransaction = { symbol, quantity, price, isBuy: false };
          Transaction.create(newTransaction).then((createdTransaction) => {
            user.transactions.push(createdTransaction);
            // Add the money to the user's account
            user.cash = user.cash + costOfSale;
            user.save();
          });
        })
        .then(() => {
          // Return success message
          res.status(200).json({
            status: 200,
            message:
              "Successfully sold " +
              quantity +
              " share(s) of " +
              symbol +
              " for $" +
              costOfSale / 100,
          });
        })
        .catch((err) => {
          if (err.message.length > 20) {
            err.message = "Invalid stock symbol.";
          }
          return res.status(400).json({
            status: 400,
            message: err.message,
          });
        });
    })
    .catch((err) => {
      if (err.message.length > 20) {
        err.message = "Invalid stock symbol.";
      }
      return res.status(400).json({
        status: 400,
        message: err.message,
      });
    });
});

// Get information for a single stock
async function getStockInfo(symbol) {
  const url =
    "https://cloud.iexapis.com/stable/stock/" +
    symbol +
    "/quote?token=" +
    process.env.IEX_APITOKEN;

  let stockQuote = await fetch(url);

  return stockQuote.json();
}

// Check if user has this stock in their list of stocks owned, if not, create it
async function checkUserOwnsStock(stockList, symbol, user) {
  for (let stock of stockList) {
    if (stock.symbol === symbol) return stock._id;
  }
  let newStock = { symbol, quantity: 0 };
  let stock = await Stock.create(newStock)
    .then((createdStock) => {
      user.stocksOwned.push(createdStock);
      user.save();
      return createdStock;
    })
    .then((stock) => {
      stock.save();
      return stock;
    });
  return stock._id;
}

module.exports = router;
