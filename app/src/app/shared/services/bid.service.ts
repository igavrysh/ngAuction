import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WebSocketSubject, webSocket } from 'rxjs/webSocket';
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
      : this._subject = webSocket(this.wsUrl);
  }

  get priceUpdates(): Observable<BidMessage> {
    return this.subject.asObservable();
  }

  constructor(@Inject(WS_URL) private readonly wsUrl: string) {
    console.log('BidService started');
  }

  placeBid(productId: number, price: number): void {
    interface MyObj {
      name: string;
      age: number;
      favoriteFood: string;
    }

    const myObj = {
      name: 'Skip',
      age: 2,
      favoriteFood: 'Steak'
    };
    const myObjStr = JSON.stringify(myObj) ;
    console.log('myObjStr:' + myObjStr);
    let s: MyObj = JSON.parse(myObjStr);
    console.log('myObjStr: ' + s.name);


    console.log('placeBid for productId: ' + productId + ' price: ' + price);
    console.log('this.subject: ' + this.subject); 

    const bid = { 
      productId: productId, 
      price: price 
    };

    this.subject.next(JSON.stringify(bid));

  }
}
