import React from "react";
import Pusher from "pusher-js";
import axios from "axios";
import { useState, useEffect } from "react";

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

  useEffect(() => {
    if ("NDEFReader" in window) {
      const ndef = new NDEFReader();
      ndef
        .scan()
        .then(() => {
          console.log("Scan started successfully.");
          ndef.onreadingerror = () => {
            console.log("Cannot read data from the NFC tag. Try another one?");
          };
          ndef.onreading = (event) => {
            console.log("NDEF message read.");
          };
        })
        .catch((error) => {
          console.log(`Error! Scan failed to start: ${error}.`);
        });
    } else alert("sibal");
  }, []);

  return (
    <div>
      <h1>Sender</h1>
      <button onClick={onClickFunction}>send web socket chat</button>
    </div>
  );
};

export default Sender;
