import React from "react";
import Pusher from "pusher-js";
import axios from "axios";
import { useState, useEffect } from "react";
import Nfc from "nfc-react-web";

const Sender = () => {
  const [state, setState] = useState({
    text: "",
  });
  const onClickFunction = () => {
    const payload = {
      text: "sender send",
    };
    axios.post("http://localhost:5000/message", payload);
    console.log("sender success");
  };

  return (
    <div>
      <h1>Sender</h1>
      <button onClick={onClickFunction}>send web socket chat</button>
      <Nfc
        read={(data) => {
          console.log(`Data read from tag: ${JSON.stringify(data)}`);
        }}
        timeout={15}
      />
    </div>
  );
};

export default Sender;
