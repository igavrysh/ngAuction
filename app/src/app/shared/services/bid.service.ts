import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WebSocketSubject } from 'rxjs/webSocket';
import { WS_URL } from '../../app.tokens';

export interface BidMessage {
  productId: number,
  price: number
}

@Injectable()
export class BidService {
  private _subject: WebSocketSubject<any>;
  private get subject(): WebSocketSubject<any> {
    const open = this._subject && !this._subject.closed;

    console.log('subject is open: ' + open);
    console.log('this wsUrl: ' + this.wsUrl);

    return open 
      ? this._subject 
      : this._subject = WebSocketSubject.create(this.wsUrl);
  }

  get priceUpdates(): Observable<BidMessage> {
    return this.subject.asObservable();
  }

  constructor(@Inject(WS_URL) private readonly wsUrl: string) {
    console.log('BidService started');
  }

  placeBid(productId: number, price: number): void {
    console.log('placeBid for productId: ' + productId + ' price: ' + price);
    console.log('this.subject: ' + this.subject); 
    this.subject.next(JSON.stringify({ productId, price }));
  }
}
