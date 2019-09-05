import { Injectable } from '@angular/core';
import { HighestBidsWithWinner } from './bidding-resolver.models';

@Injectable({
  providedIn: 'root'
})
export class BiddingResolverService {

  constructor() { }

  generateAuction(): Map<string, number[]> {
    return new Map<string, number[]>()
      .set('A', [ 110, 130 ])
      .set('B', [ 0 ])
      .set('C', [ 125 ])
      .set('D', [ 105, 115, 90 ])
      .set('E', [ 132, 135, 140 ]);
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

  findSecondHighestBid(bids: number[], reservePrice): number {
    if (bids.length === 0) {
      return;
    }

    const bidsOrderByDesc =  bids.sort((a: number, b: number) => b - a);
    const secondHighBid = bidsOrderByDesc.length > 1 ? bidsOrderByDesc[ 1 ] : bidsOrderByDesc[ 0 ];

    return secondHighBid >= reservePrice ? secondHighBid : reservePrice;
  }

  computeSecondPriceAuctionWinner(bidders: Map<string, number[]>, reservePrice: number): { bidder: string, price: number} {
    const highestBidsWithWinner = this.extractHighestBidFromBiddersWithWinner(bidders);
    const flattenBids = Array.from(highestBidsWithWinner.highestBidPerWinner.values());

    if (!highestBidsWithWinner || !flattenBids || flattenBids.length === 0) {
      return;
    }

    return {
      bidder: highestBidsWithWinner.winner,
      price: this.findSecondHighestBid(flattenBids, reservePrice)
    };
  }

}



