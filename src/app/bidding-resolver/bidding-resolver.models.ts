export interface HighestBidsWithWinner {
  winner: string;
  highestBidPerNonWinningBidder: Map<string, number>;
}

export interface WinningBidder {
  bidder: string;
  price: number;
}
