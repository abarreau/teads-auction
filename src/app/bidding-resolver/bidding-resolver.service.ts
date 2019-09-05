import { Injectable } from '@angular/core';
import { HighestBidsWithWinner, WinningBidder } from './bidding-resolver.models';

@Injectable({
  providedIn: 'root'
})
export class BiddingResolverService {

  constructor() { }

  generateTeadsAuction(): Map<string, number[]> {
    return new Map<string, number[]>()
      .set('A', [ 110, 130 ])
      .set('B', [ 0 ])
      .set('C', [ 125 ])
      .set('D', [ 105, 115, 90 ])
      .set('E', [ 132, 135, 140 ]);
  }

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

  extractHighestBidFromBiddersWithWinner(bidders: Map<string, number[]>): HighestBidsWithWinner {
    let highestBidder: { bidder: string, highestBid: number };
    const highestBidPerUser = new Map<string, number>();

    bidders.forEach((bids: number[], bidder: string) => {
      const highestBidOfCurrentBidder = bids.sort((a: number, b: number) => a - b)[bids.length - 1];

      if (!highestBidder || highestBidder.highestBid < highestBidOfCurrentBidder) {
        highestBidder = { bidder, highestBid: highestBidOfCurrentBidder };
      }

      highestBidPerUser.set(bidder, highestBidOfCurrentBidder);
    });

    return {
      highestBidPerWinner: highestBidPerUser,
      winner: highestBidder ? highestBidder.bidder : undefined
    };
  }

  findWinningBidPrice(bids: number[], reservePrice): number {
    if (bids.length === 0) {
      return reservePrice;
    }

    const bidsAboveReservePriceByDesc = bids.sort((a: number, b: number) => b - a).filter(bid => bid > reservePrice);

    return bidsAboveReservePriceByDesc.length > 0 ? bidsAboveReservePriceByDesc.pop() : reservePrice;
  }

  computeSecondPriceAuctionWinner(bidders: Map<string, number[]>, reservePrice: number): WinningBidder {
    const highestBidsWithWinner = this.extractHighestBidFromBiddersWithWinner(bidders);

    if (!highestBidsWithWinner || !highestBidsWithWinner.winner) {
      return;
    }

    const flattenedBids = Array.from(highestBidsWithWinner.highestBidPerWinner.values());
    const nonWinningBids = flattenedBids.slice(0, flattenedBids.length - 1); // we remove the winning bid

    return {
      bidder: highestBidsWithWinner.winner,
      price: this.findWinningBidPrice(nonWinningBids, reservePrice)
    };
  }

}



