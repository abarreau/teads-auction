export interface HighestBidsWithWinner {
  winner: string;
  highestBidPerWinner: Map<string, number>;
}

export interface WinningBidder {
  bidder: string;
  price: number;
}
