import { Injectable } from '@angular/core';
import { HighestBidsWithWinner, WinningBidder } from './bidding-resolver.models';

@Injectable({
  providedIn: 'root'
})
export class BiddingResolverService {

  constructor() { }

  /**
   * Generates the Teads Auction problem.
   * @return a map bidders identified by string and containing their bids
   */
  generateTeadsAuction(): Map<string, number[]> {
    return new Map<string, number[]>()
      .set('A', [ 110, 130 ])
      .set('B', [ 0 ])
      .set('C', [ 125 ])
      .set('D', [ 105, 115, 90 ])
      .set('E', [ 132, 135, 140 ]);
  }

  /**
   * Generates a random auction with a random number of bidders and a random number of bids per bidder.
   * @return a map bidders identified by string and containing their bids
   */
  generateRandomAuction(): Map<string, number[]> {
    const results = new Map<string, number[]>();
    const randomNumOfBidders = 2 + Math.floor(Math.random() * 3);

    for (let numOfBidders = 0; numOfBidders < randomNumOfBidders; numOfBidders++) {
      const randomNumOfBids = 1 + Math.floor(Math.random() * 4);
      const bids = [];

      for (let numOfBid = 0; numOfBid < randomNumOfBids; numOfBid++) {
        const randomBid = Math.floor(Math.random() * 200);
        bids.push(randomBid);
      }

      results.set(numOfBidders.toString(), bids);
    }

    return results;
  }

  /**
   * Given a map of bidders with their bids, find the winner of the auction :
   * The buyer winning the auction is the one with the highest bid.
   * @param bidders a map of bidders with their bids
   */
  extractHighestBidFromBiddersWithWinner(bidders: Map<string, number[]>): HighestBidsWithWinner {
    let highestBidder: { bidder: string, highestBid: number };
    const highestBidPerUser = new Map<string, number>();

    // to find the highest bidder, we must iterate over each bidder
    bidders.forEach((bids: number[], bidder: string) => {

      // we sort the bids by ascending order to find the highest one
      const highestBidOfCurrentBidder = bids.sort((a: number, b: number) => a - b)[bids.length - 1];

      // if we found a new highest bidder, we store it
      if (!highestBidder || highestBidder.highestBid < highestBidOfCurrentBidder) {
        highestBidder = { bidder, highestBid: highestBidOfCurrentBidder };
      }

      highestBidPerUser.set(bidder, highestBidOfCurrentBidder);
    });

    // we remove from the bidder the winning one in order to compute the non winning buyers.
    if (highestBidder) {
      highestBidPerUser.delete(highestBidder.bidder);
    }

    return {
      highestBidPerNonWinningBidder: highestBidPerUser,
      winner: highestBidder ? highestBidder.bidder : undefined
    };
  }

  /**
   * Returns the winning price from the bids.
   * The winning price is the highest bid price from a non-winning buyer above the reserve price
   * (or the reserve price if none applies)
   * @param bids a list of bid prices comming from non winning byers
   * @param reservePrice the auction reserve price
   */
  findWinningBidPrice(bids: number[], reservePrice): number {
    if (bids.length === 0) {
      return reservePrice;
    }

    const bidsAboveReservePriceByDesc = bids.filter(bid => bid > reservePrice).sort((a: number, b: number) => a - b);

    return bidsAboveReservePriceByDesc.length > 0 ? bidsAboveReservePriceByDesc.pop() : reservePrice;
  }

  /**
   * Given a map of bidders, computes the winner of the auction with the winning price.
   * @param bidders a map of bidders with their bids
   * @param reservePrice the auction reserve price
   */
  computeSecondPriceAuctionWinner(bidders: Map<string, number[]>, reservePrice: number): WinningBidder {
    const highestBidsWithWinner = this.extractHighestBidFromBiddersWithWinner(bidders);

    if (!highestBidsWithWinner || !highestBidsWithWinner.winner) {
      return;
    }

    const nonWinningBids = Array.from(highestBidsWithWinner.highestBidPerNonWinningBidder.values());

    return {
      bidder: highestBidsWithWinner.winner,
      price: this.findWinningBidPrice(nonWinningBids, reservePrice)
    };
  }

}



