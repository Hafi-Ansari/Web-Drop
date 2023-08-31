import { Peer } from "peerjs";
import { v4 as uuidv4 } from 'uuid';


const peer = new Peer(undefined, {
  // Don't provide an ID here
  host: "localhost",
  port: 3000,
  path: "/peerjs",
});

peer.on("open", (id) => {
  // The peer is now open and its ID is set
  console.log("My peer ID is: " + id);
});

export { peer };
