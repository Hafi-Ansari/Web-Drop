import { Peer } from "peerjs";
import { v4 as uuidv4 } from "uuid";

const peer = new Peer(uuidv4(), {
  host: import.meta.env.VITE_IP,  
  port: 3000,
  path: '/peerjs',
});


export { peer };
