import * as http from 'http';
import * as ws from 'ws';
import { updateProductPrice } from './db';

interface BidMessage {
  productId: number;
  price: number;
} 

export function createBidServer(httpServer: http.Server): BidServer {
  return new BidServer(httpServer);
}

export class BidServer {
  private readonly wsServer: ws.Server;

  constructor(server: http.Server) {
    this.wsServer = new ws.Server({ server: server });
    this.wsServer.on('error', error => this.onError(error));
    this.wsServer.on('connection', ws => this.onConnection(ws));
    console.log('BidServer started');
    console.log('wsServer: ' + this.wsServer);
  }

  private onConnection(ws: ws): void {

    // Subscribe to WebSocket events.
    ws.on('message', message => this.onMessage(<string>message));
    ws.on('error', error => this.onError(error));
    ws.on('close', () => this.onClose());

    console.log(`Connections count: ${this.wsServer.clients.size}`);
  }

  private onMessage(message: string): void {
    console.log("message: " + message);
    const bid: BidMessage = JSON.parse(message);
    console.log("console.log(bid) = ");
    console.log(bid);
    //console.log("Recieved bid +++: " + bid);
    console.log("Recievd bid for productId: " + bid.productId + ", price: " + bid.price);
    console.log(bid.price);

    //updateProductPrice(bid.productId, bid.amount);
    updateProductPrice(1, 1);
    // Broadcast new price.
    //this.wsServer.clients.forEach(ws => ws.send(JSON.stringify(bid)));
    //console.log(`Bid ${bid.amount} is placed on product ${bid.productId}`);
  }

  private onClose(): void {
    console.log(`Connections count: ${this.wsServer.clients.size}`);
  }

  private onError(error: Error): void {
    console.error(`WebSocket error: "${error.message}"`);
  }
}