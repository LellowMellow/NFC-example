import React, { useEffect } from "react";
import Pusher from "pusher-js";
import axios from "axios";
import { useState } from "react";

const Receiver = () => {
  const [state, setState] = useState({
    text: "",
  });

  useEffect(() => {
    const pusher = new Pusher("355b90c48a1eaff96f03", {
      cluster: "ap3",
      encrypted: true,
    });
    const channel = pusher.subscribe("chat");
    channel.bind("message", (data) => {
      setState(data);
    });
    console.log("Sibal");
  }, []);

  return (
    <div>
      <h1>Receiver</h1>
      {state.text}
    </div>
  );
};

export default Receiver;
