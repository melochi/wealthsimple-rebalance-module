/**
 *
 */

 /**
 * Portfolio Rebalancing module
 */

/**
 * Helper for parameter testing
 */
Array.prototype.isArray = true;

/**
 * This structure is just one possibility of orgaizing the incoming data
 * we will need for the task.
 *
 * I will assume that Share parameters are coming from the database or have
 * been otherwise checked for validity.
 *
 * @param {string} ticker
 * @param {number} number
 * @param {number} price
 * @param {number} alloc
 */
function Share(ticker, number, price, alloc) {
	this.ticker = ticker;
	this.number = number;
	this.price  = price;
	this.alloc  = alloc;
	this.value  = function() {
		return this.price * this.number;
	}
}

/**
 * To avoid having to pass extra variables, like 'balance' below, we could
 * employ additional construct to contain any additional properties and methods
 * related to share manipulations. E.g., balance, addShare(), etc.
 *
 * Generally, Portfolio should get all necessary info by a single ID.
 */
/*
function Portfolio(shares, balance) {
	this.shares = shares;
	this.balance = balance;
	this.total  = function() {
		var i, val, len;
		for (i = 0, val = 0, len = shares.length; i < len; i++) {
			val += shares[i].number * shares[i].price;
		}
		return val + this.balance;
	};
}
*/

/**
 * Main wrapper function of the module. Delegates calculations to calculateUpdate()
 * and only generates buy/sell instructions.
 *
 * return example: 'buy 9 shares of GOOG, sell 114 shares of TSLA'
 *
 * @param {Share[]} shares
 * @param {number} balance
 * @return {string}
 */
function getInstructions(shares, balance) {
	var instruct, i, len, share, diff;
	instruct = '';

	/* --- generally, we'd do some parameter check in case we cannot fully trust their origin, e.g.: --- */
	if (!shares.isArray) {
		throw new Error('Bad argument in getInstructions(): array is expected');
	}
	if (!shares.length) {
		return 'This portfolio is empty. Nothing to rebalance.';
	}

	/* --- CORE ALGORITHM --- */
	balance = calculateUpdate(shares, balance);

	/* ---  --- */
	for (i = 0, len = shares.length; i < len; i++ ) {
		share = shares[i];
		diff = share.number - share.numberOld;

		if (diff == 1) {
			instruct += ', buy 1 share of ' + share.ticker;
		}
		if (diff > 1) {
			instruct += ', buy ' + diff + ' shares of ' + share.ticker;
		}
		if (diff == -1) {
			instruct += ', sell 1 share of ' + share.ticker;
		}
		if (diff < 0) {
			instruct += ', sell ' + (-diff) + ' shares of ' + share.ticker;
		}
	}
	return instruct.substring(2) + '\navailable balance: $' + balance;
}

/**
 * This is the heart of the module. Should be adjusted according to the choice
 * of algorithm for portfolio rebalancing.
 *
 * Below is a very simple version. To keep in synch with the example given in
 * the coding challenge it does not take into account remaining balance after
 * initial rebalancing. That balance of $30 could be used to buy, say, an extra share
 * of AAPL for $22 and of TSLA for $8.
 *
 * Also, this algorithm does not take into account an allowed margin of allocation
 * imbalance in order to prevent the system from infinitely (or, say, until next price
 * changes) attempting to rebalance the same portfolio.
 *
 * @param {Share[]} shares
 * @param {number} balance
 * @return {string}
 */
function calculateUpdate(shares, balance) {
	var i, len, share, total;

	if (!shares.isArray) {
		throw new Error('Bad argument in calculateUpdate(): array expected');
	}
	total = getValue(shares) + balance;

	setAllocRatio(shares, total);
	sortByAllocRatioDesc(shares);
	updateNumber(shares);

	balance = total - getValue(shares);

	return balance;
}

/**
 * Calculate combined values of shares
 *
 * @param {Share[]} shares
 * @return {number} total
 */
function getValue(shares) {
	var i, len, share, value;

	for (i = 0, value = 0, len = shares.length; i < len; i++) {
		share  = shares[i];
		value += share.number * share.price;
	}

	return value;
}

/**
 * For each kind of shares calculate its ration of target and actual allocation.
 * It is used to calculate the update to the number of those shares that should
 * be in the portfolio to be properly balanced.
 *
 * @param {Share[]} shares
 * @return void
 */
function setAllocRatio(shares, total) {
	var i, len, share;

	for (i = 0, len = shares.length; i < len; i++) {
		share = shares[i];
		share.allocRatio = share.alloc * total / share.value() / 100;
	}
}

/**
 * Recalculate how many of each company shares should be in updated portfolio.
 * Move the current number for each share to numberOld for later reporting.
 *
 * For conservative calculations to keep the balance above ground I use Math.floor.
 * If portfolio balance were allowed to go negative, one could use Math.round()
 * instead.
 *
 * @param {Share[]} shares
 * @return void
 */
function updateNumber(shares) {
	var i, len, share;
	for (i = 0, len = shares.length; i < len; i++) {
		share = shares[i];
		share.numberOld = share.number;
		share.number    = Math.floor(share.number * share.allocRatio);
	}
}

/**
 * Sort shares array to move the biggest allocation violators to the front, both
 * underbought and overbought, so that they can be taken care of first. This could
 * make a difference if we were particular about listing instructions in the order
 * of future transactions and recalculating balance after every number update.
 *
 * I made this sorting under assumption that since the primary task at hand is
 * to bring back all allocations to their target values, the algorithm first
 * takes care of the shares where the relative allocation difference is greatest,
 * regardless of the total value of each kind of shares. Another approach would
 * be to start rebalancing with those shares where their total value deviates most
 * from their target value (according to their price and target allocation).
 *
 * @param {Share[]} shares
 * @return {number}
 */
function sortByAllocRatioDesc(shares) {
	var A, B, a, b;
	return shares.sort(function(shareA, shareB) {
		A = shareA.allocRatio;
		B = shareB.allocRatio;
		a = A > 1 ? A : 1/A;
		b = B > 1 ? B : 1/B;
		if ( a > b) {
			return -1;
		}
		if (a < b) {
			return 1;
		}
		return 0;
	});
}
