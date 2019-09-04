import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BiddingResolverComponent } from './bidding-resolver.component';
import { BiddingResolverService } from './bidding-resolver.service';

describe('BiddingResolverComponent', () => {
  let component: BiddingResolverComponent;
  let fixture: ComponentFixture<BiddingResolverComponent>;

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
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return second highest bid with multiple bids', () => {
    const service: BiddingResolverService = TestBed.get(BiddingResolverService);
    expect(service.findSecondHighestBid([1, 32, 10])).toEqual(10);
  });

  it('should return second highest bid with no bids', () => {
    const service: BiddingResolverService = TestBed.get(BiddingResolverService);
    expect(service.findSecondHighestBid([])).toBeUndefined();
  });

  it('should return second highest bid with one bid', () => {
    const service: BiddingResolverService = TestBed.get(BiddingResolverService);
    expect(service.findSecondHighestBid([1])).toEqual(1);
  });
});
