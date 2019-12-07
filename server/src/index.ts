import * as express from 'express';
import * as path from "path";
import { createServer } from 'http';
import { createBidServer } from './ws';
import { api } from './rest';
const app = express();

app.use('/', express.static(path.join(__dirname, 'build/public')));
app.use('/api', api);
app.use('/data', express.static('data'));

const server = createServer(app);
createBidServer(server);
server.listen(9090);