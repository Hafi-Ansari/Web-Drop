import { Peer } from 'peerjs';

const peer = new Peer('some-id', {
  host: 'localhost',
  port: 3000,
  path: '/peerjs'
});

export {peer}
