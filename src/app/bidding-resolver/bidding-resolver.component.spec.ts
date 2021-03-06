import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BiddingResolverComponent } from './bidding-resolver.component';
import { BiddingResolverService } from './bidding-resolver.service';

describe('BiddingResolverComponent', () => {
  let component: BiddingResolverComponent;
  let fixture: ComponentFixture<BiddingResolverComponent>;
  let service: BiddingResolverService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BiddingResolverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BiddingResolverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    service = TestBed.get(BiddingResolverService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return winning bid price with multiple bids below reserve price', () => {
    expect(service.findWinningBidPrice([1, 32, 10], 100)).toEqual(100);
  });

  it('should return winning bid price with multiple bids above reserve price', () => {
    expect(service.findWinningBidPrice([110, 32, 200], 100)).toEqual(200);
  });

  it('should return winning bid price with no bids', () => {
    expect(service.findWinningBidPrice([], 100)).toEqual(100);
  });

  it('should return winning bid price with one bid below reserve price', () => {
    expect(service.findWinningBidPrice([1], 100)).toEqual(100);
  });

  it('should return winning bid price with one bid above reserve price', () => {
    expect(service.findWinningBidPrice([200], 100)).toEqual(200);
  });

  it('should find highest bidder with multiple bidders', () => {
    const bidders = new Map<string, number[]>()
      .set('A', [ 110, 130 ])
      .set('B', [ 0 ])
      .set('C', [ 125 ])
      .set('D', [ 105, 115, 90 ])
      .set('E', [ 132, 135, 140 ]);

    expect(service.extractHighestBidFromBiddersWithWinner(bidders)).toEqual({
      winner: 'E',
      highestBidPerNonWinningBidder: new Map()
        .set('A', 130)
        .set('B', 0)
        .set('C', 125)
        .set('D', 115)
    });
  });

  it('should find highest bidder with no bidders', () => {
    const bidders = new Map<string, number[]>();

    expect(service.extractHighestBidFromBiddersWithWinner(bidders)).toEqual({
      highestBidPerNonWinningBidder: new Map(),
      winner: undefined
    });
  });

  it('should find highest bidder with one bidder', () => {
    const bidders = new Map<string, number[]>()
      .set('B', [ 0 ]);

    expect(service.extractHighestBidFromBiddersWithWinner(bidders)).toEqual({
      winner: 'B',
      highestBidPerNonWinningBidder: new Map()
    });
  });

  it('should compute second price auction winner with multiple bidders', () => {
    const bidders = new Map<string, number[]>()
      .set('A', [ 110, 130 ])
      .set('B', [ 0 ])
      .set('C', [ 125 ])
      .set('E', [ 132, 135, 140 ])
      .set('D', [ 105, 115, 90 ]);

    expect(service.computeSecondPriceAuctionWinner(bidders, 100)).toEqual({
      bidder: 'E',
      price: 130
    });
  });

  it('should compute second price auction winner with one bidder with reserve price unreached', () => {
    const bidders = new Map<string, number[]>().set('B', [ 0 ]);
    expect(service.computeSecondPriceAuctionWinner(bidders, 100)).toEqual({
      bidder: 'B',
      price: 100
    });
  });

  it('should compute second price auction winner with one bidder with reserve price reached', () => {
    const bidders = new Map<string, number[]>().set('B', [ 110 ]);
    expect(service.computeSecondPriceAuctionWinner(bidders, 100)).toEqual({
      bidder: 'B',
      price: 100
    });
  });

  it('should compute second price auction winner with no bidder', () => {
    const bidders = new Map<string, number[]>();
    expect(service.computeSecondPriceAuctionWinner(bidders, 100)).toBeUndefined();
  });


});
