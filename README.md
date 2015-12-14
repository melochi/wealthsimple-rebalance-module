# Portfolio Rebalancing Module

## Functional spec

Each Wealthsimple customer has a portfolio with a set of investments along with target allocations for these investments. However, as share prices fluctuate, the actual allocations of investments may diverge from the target allocations. For example:

| Ticker | Target allocation | Actual allocation | Shares owned | Share price |
|--------|-------------------|-------------------|--------------|-------------|
| GOOG   | 60%               | 50.96%            | 52           | $98         |
| AAPL   | 30%               | 29.92%            | 136          | $22         |
| TSLA   | 10%               | 19.12%            | 239          | $8          |

The job of the rebalancing module is to buy or sell shares to bring the actual allocation of investments as close as possible to the target allocations.

This program does not have any UI. It takes in the current state of investments and target allocations as inputs, and output the set of buys and sells necessary to rebalance these investments (e.g `buy 9 shares of GOOG, sell 114 shares of TSLA`).

### Assumptions and Trade-offs

* The rebalancing algorithm acts under assumption that the primary task at hand is bringing back all share allocations to their target values and first takes care of the shares where the relative allocation difference is greatest, regardless of the total value of each kind of shares. Another possible approach would be to start rebalancing with those shares where their total value deviates most from their target value (according to their price and target allocation).
* The algorithm does not take into account any allowed margin of allocation imbalance to prevent the system from repeated attempts to rebalance the same portfolio until next price changes.
* For simplicity we do not take into account the portfolio changing total and balance (credit or debit resulting from rebalancing) during the rebalancing phase itself.

## Technical spec

### Language

The choice of JavaScript is due to the author's current limited command of Java. Future transfer into Java to facilitate the module's integration with Wealthsimple's trade execution code is on to-do list.

### Testing

Testing is done with [QUnit], a minimalistic, yet comprehensive JavaScript testing framework with no overhead and possibility of full automation. Easy to pick up from scratch, too :)

To run the Rebalance test suite, open the ```tests/Rebalance-test.html```.

### Use

```[prefix]getInstructions(shares, balance);``` where
```shares``` is an array of Share objects, ```balance``` is a number. ```[prefix]``` is dictated by the main application framework.

## Help and Support

Email Masha: masha.khesin@gmail.com

## Acknowledgements

The author would like to thank Wealthsimple for this opportunity to practice and to learn something new.
