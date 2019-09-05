import { Component, OnInit } from '@angular/core';
import { BiddingResolverService } from './bidding-resolver.service';
import { WinningBidder } from './bidding-resolver.models';

@Component({
  selector: 'app-bidding-resolver',
  templateUrl: './bidding-resolver.component.html',
  styleUrls: ['./bidding-resolver.component.scss']
})
export class BiddingResolverComponent implements OnInit {

  public bids: Map<string, number[]>;
  public winningBidder: WinningBidder;
  public reservePrice = 100;

  constructor(private readonly biddingResolverService: BiddingResolverService) { }

  ngOnInit() {
    this.bids = this.biddingResolverService.generateTeadsAuction();
    this.winningBidder = this.biddingResolverService.computeSecondPriceAuctionWinner(this.bids, this.reservePrice);
  }

  generateRandomAuction() {
    this.bids = this.biddingResolverService.generateRandomAuction();
    this.winningBidder = this.biddingResolverService.computeSecondPriceAuctionWinner(this.bids, this.reservePrice);
  }

  prettyPrintBids() {
    return Array.from(this.bids);
  }

}
