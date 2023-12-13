const { useState, useEffect, useRef } = require("react");
import { useRouter } from "next/router";

import { useSocket } from "@/context/socket";
const usePeer = () => {
  const socket = useSocket();
  const [peer, setPeer] = useState(null);
  const [myId, setMyId] = useState("");
  const isPeerSet = useRef(false);
  const roomId = useRouter().query.roomId;
  //These is how we can export default exported class in useEffect
  useEffect(() => {
    if (isPeerSet.current || !roomId || !socket) return;
    isPeerSet.current = true;
    (async function initPeer() {
      const myPeer = new (await import("peerjs")).default();
      setPeer(myPeer);

      myPeer.on("open", (id) => {
        console.log(`Your peer id is ${id}`);
        setMyId(id);
        socket?.emit("join room", roomId, id);
      });
    })();
  }, [roomId, socket]);
  return {peer, myId};
};
export default usePeer;
