import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BiddingResolverComponent } from './bidding-resolver/bidding-resolver.component';

@NgModule({
  declarations: [
    AppComponent,
    BiddingResolverComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
