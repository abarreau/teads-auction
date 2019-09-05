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

  it('should return second highest bid with multiple bids', () => {
    expect(service.findSecondHighestBid([1, 32, 10])).toEqual(10);
  });

  it('should return second highest bid with no bids', () => {
    expect(service.findSecondHighestBid([])).toBeUndefined();
  });

  it('should return second highest bid with one bid', () => {
    expect(service.findSecondHighestBid([1])).toEqual(1);
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
      highestBidPerWinner: new Map()
        .set('A', 130)
        .set('B', 0)
        .set('C', 125)
        .set('D', 115)
        .set('E', 140)
    });
  });

  it('should find highest bidder with no bidders', () => {
    const bidders = new Map<string, number[]>();

    expect(service.extractHighestBidFromBiddersWithWinner(bidders)).toEqual({
      highestBidPerWinner: new Map(),
      winner: undefined
    });
  });

  it('should find highest bidder with one bidder', () => {
    const bidders = new Map<string, number[]>()
      .set('B', [ 0 ]);

    expect(service.extractHighestBidFromBiddersWithWinner(bidders)).toEqual({
      winner: 'B',
      highestBidPerWinner: new Map().set('B', 0)
    });
  });


});
