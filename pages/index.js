import { useSocket } from "@/context/socket"
import { useEffect } from "react";

export default function Home() {
  const socket  = useSocket();

  useEffect(()=>{
    socket?.on("connect",()=>{
      console.log("Client Id", socket.id); //Here is the Client Id.
    });
  },[socket]);

  return (
   <h1>Hey</h1>
  )
}
