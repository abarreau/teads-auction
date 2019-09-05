import { Component, OnInit } from '@angular/core';
import { BiddingResolverService } from './bidding-resolver.service';

@Component({
  selector: 'app-bidding-resolver',
  templateUrl: './bidding-resolver.component.html',
  styleUrls: ['./bidding-resolver.component.scss']
})
export class BiddingResolverComponent implements OnInit {

  private bids: Map<string, number[]>;

  constructor(private readonly biddingResolverService: BiddingResolverService) { }

  ngOnInit() {
    this.bids = this.biddingResolverService.generateTeadsAuction();
    this.winningBidder = this.biddingResolverService.computeSecondPriceAuctionWinner(this.bids, 100);
  }

}
