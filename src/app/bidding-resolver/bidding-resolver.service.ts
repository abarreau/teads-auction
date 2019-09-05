import { Injectable } from '@angular/core';


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

  findHighestBidder(bidders: Map<string, number[]>): { bidder: string, highestBid: number } | undefined {
    let highestBidder: { bidder: string, highestBid: number };

    bidders.forEach((bids: number[], bidder: string) => {
      const highestBidOfCurrentBidder = bids.sort().pop();

      if (!highestBidder || highestBidder.highestBid < highestBidOfCurrentBidder) {
        highestBidder = { bidder, highestBid: highestBidOfCurrentBidder };
      }
    });

    return highestBidder;
  }

  findSecondHighestBid(bids: number[]): number {
    if (bids.length === 0) {
      return;
    }

    const bidsOrderByDesc =  bids.sort((a: number, b: number) => b - a);

    return bidsOrderByDesc.length > 1 ? bidsOrderByDesc[ 1 ] : bidsOrderByDesc[ 0 ];
  }

  computeSecondPriceAuctionWinner(bidders: Map<number, string>, reservePrice: number): [string, number] {
    throw new Error('Not implemented yet !');
  }

}



