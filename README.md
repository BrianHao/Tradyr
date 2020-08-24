
# Tradyr
**Tradyr** is a simple to use web-based stock portfolio app.

A stock, for the purpose of this project, is simply an asset that can be bought or sold at a price that continuously
rises and falls throughout the day. Up-to-date stock pricing data is provided by [IEX Cloud](https://iexcloud.io) API.

## User Stories
- A user may sign up for an **account** by providing an email, name and password. 
	> - Each user starts with $5,000.00 in their account.
	> - A user can only register once with any given email.
	> - The user can then log in via their email and password in order to access their account.
	
- Once logged in, the user can view their **stock portfolio**
	> - Displays the current value of the portfolio (sum of latest prices of all owned stocks).
	> - Displays a list of the user's currently owned stocks, the quantity owned, and its latest price from [IEX Cloud](https://iexcloud.io).
	> - Next to each stock's latest price is its change since the day's open price, and is color coded accordingly:![Stock](https://i.imgur.com/X4aC7R8.png)


- Once logged in, the user can **buy** and **sell** stocks
	> - Users may **buy** or **sell** stocks by providing a valid ticker stock symbol (ie. AAPL) and a valid quantity.
	> - Users may only buy quantities of stocks in whole numbers.
	> - The user must have enough cash in their account (if buying), or have enough shares of the stock in their portfolio (if selling).

- Once logged in, the user can view their **transactions history**
	> - Displays a list of all transactions (trades) made by the user.
	> - Each record includes the transaction date and time, type (buy or sell), stock symbol, quantity, and the price per share at the time of the transaction:
	![Transaction](https://i.imgur.com/bB3bwGh.png)

## Demo
A demo can be found at:
[tradyr.herokuapp.com](https://tradyr.herokuapp.com)




## Technologies
Tradyr was created using the MERN Stack:
- **Back-end:** Node.js + Express
- **Database:** MongoDB
- **Front-end:** React.js
- **API:** Stock data provided by [IEX Cloud](https://iexcloud.io)

### Created By: Brian Hao