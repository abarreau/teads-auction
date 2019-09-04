import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BiddingResolverComponent } from './bidding-resolver.component';

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
});
