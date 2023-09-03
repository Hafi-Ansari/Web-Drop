import { Peer } from "peerjs";
import { v4 as uuidv4 } from "uuid";

const peer = new Peer(uuidv4(), {
  host: '192.168.1.97',  // or import from environment variable
  port: 3000,
  path: '/peerjs',
});


export { peer };
