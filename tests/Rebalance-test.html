/**
 *
 */

/**
 *
 */
QUnit.test( 'Share definition', function( assert ) {
	expect(5);

	var s1 = new Share('GOOG', 52,  98, 60);

	assert.strictEqual( s1.ticker, 'GOOG', 'Google share ticker is GOOG' );
	assert.strictEqual( s1.number,     52, 'Number of Google shares' );
	assert.strictEqual( s1.price ,     98, 'Price of Google shares' );
	assert.strictEqual( s1.alloc ,     60, 'Target allocation of Google shares (%)' );
	assert.strictEqual( s1.value(), 98*52, 'Value of Google shares' );
});

/**
 *
 */
QUnit.test( 'getValue(shares)', function( assert ) {
	expect(2);

	var s1 = new Share('GOOG', 52,  98, 60);
	var s2 = new Share('AAPL', 136, 22, 30);
	var s3 = new Share('TSLA', 239,  8, 10);
	var shares = [s1, s2, s3];

	var value = getValue(shares);

	assert.strictEqual( value, 10000, 'Calculates total value of all shares' );

	shares = [];
	value = getValue(shares);

	assert.strictEqual( value, 0, 'Empty porfolio is worth $0 (not including balance)');
});

/**
 *
 */
QUnit.test( 'setAllocRatio(shares, total)', function( assert ) {
	var s1 = new Share('GOOG', 52,  98, 60);
	var s2 = new Share('AAPL', 136, 22, 30);
	var s3 = new Share('TSLA', 239,  8, 10);
	var shares     = [s1  , s2  , s3];
	var allocRatio = [1.18, 1.00, 0.52];
	var value = getValue(shares);
	var i, len = shares.length;

	expect(len * 2);

	setAllocRatio(shares, value);

	for (i = 0; i < len; i++) {
		assert.strictEqual( typeof shares[i].allocRatio, 'number', 'Sets allocRatio property for all shares' );
		assert.equal( shares[i].allocRatio.toFixed(2), allocRatio[i], 'Sets allocRatio property for all shares' );
	}
});

/**
 *
 */
QUnit.test( 'updateNumber(shares)', function( assert ) {
	var s1 = new Share('GOOG', 52,  98, 60);
	var s2 = new Share('AAPL', 136, 22, 30);
	var s3 = new Share('TSLA', 239,  8, 10);
	var shares = [s1, s2, s3];
	var i, len = shares.length, numbersOld;

	expect(len * 3);

	numbersOld = [];
	for (i = 0; i < len; i++) {
		numbersOld.push(shares[i].number);
	}

	var value = getValue(shares);
	setAllocRatio(shares, value);

	updateNumber(shares);

	for (i = 0; i < len; i++) {
		assert.strictEqual( shares[i].numberOld, numbersOld[i], 'Sets numberOld property for all shares');
		assert.strictEqual( typeof shares[i].numberOld, 'number', 'Updates number property for all shares' );
		assert.ok( shares[i].number, 'Updates number property for all shares' );
	}
});

/**
 *
 */
QUnit.test( 'calculateUpdate(shares, balance)', function( assert ) {
	expect(1);

	var s1 = new Share('GOOG', 52,  98, 60);
	var s2 = new Share('AAPL', 136, 22, 30);
	var s3 = new Share('TSLA', 239,  8, 10);
	var shares   = [s1, s2, s3];
	var balance = 0;

	balance = calculateUpdate(shares, balance);

	assert.strictEqual( balance, 30, 'Returns new balance after portfolio update calculations' );
});
/**
 *
 */
QUnit.test( 'getInstructions(shares, balance)', function( assert ) {
	expect(3);

	var s1 = new Share('GOOG', 52,  98, 60);
	var s2 = new Share('AAPL', 136, 22, 30);
	var s3 = new Share('TSLA', 239,  8, 10);
	var shares       = [s1, s2, s3];
	var balance     = 0;
	var instructions = 'sell 114 shares of TSLA, buy 9 shares of GOOG\navailable balance: $30';

	var instr = getInstructions(shares, balance);
	assert.strictEqual( instr, instructions, 'Generates buy/sell instructions' );

	instr = getInstructions([], 0);
	assert.strictEqual( instr, 'This portfolio is empty. Nothing to rebalance.', 'Reports empty portfolio' );

	assert.throws(function () {
		instr = getInstructions(0, 0);
	},
	new Error('Bad argument in getInstructions(): array is expected'),
	'Passing a non-array raises an Error');
});
