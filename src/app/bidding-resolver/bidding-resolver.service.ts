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

  findHighestBidder(bidders: Map<string, number[]>): string {
    throw 'Not implemented yet !';
  }

  findSecondHighestBid(bids: number[]): number {
    if (bids.length == 0) return;

    const bidsOrderByDesc =  bids.sort((a: number, b: number) => b - a);

    if (bidsOrderByDesc.length > 1) {
      return bidsOrderByDesc[ bidsOrderByDesc.length - 2 ];
    } else {
      return bidsOrderByDesc[ 0 ];
    }
  }

  computeSecondPriceAuctionWinner(bidders: Map<number, string>): [string, number] {
    throw 'Not implemented yet !';
  }

}



