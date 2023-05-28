import React, { useState } from "react";
import { Howl } from "howler";

import sound1 from "./Notes/sound1.wav";
import sound2 from "./Notes/sound2.wav";
import sound3 from "./Notes/sound3.wav";
import sound4 from "./Notes/sound4.wav";
import sound5 from "./Notes/sound5.wav";
import sound6 from "./Notes/sound6.wav";
import sound7 from "./Notes/sound7.wav";
import sound8 from "./Notes/sound8.wav";
import sound10 from "./Notes/sound10.wav";
import sound12 from "./Notes/sound12.wav";
import sound14 from "./Notes/sound14.wav";
import sound15 from "./Notes/sound15.wav";
import sound16 from "./Notes/sound16.wav";
import sound17 from "./Notes/sound17.wav";
import sound18 from "./Notes/sound18.wav";
import sound19 from "./Notes/sound19.wav";
import sound23 from "./Notes/sound23.wav";

let currentSound = null;

const Play = () => {
  const arr = [
    sound1,
    sound2,
    sound3,
    sound4,
    sound5,
    sound6,
    sound7,
    sound8,
    sound10,
    sound12,
    sound14,
    sound15,
    sound16,
    sound17,
    sound18,
    sound19,
    sound23,
  ];

  if (currentSound) {
    console.log("stopping it");
    currentSound.stop();
  }
  const num = Math.floor(Math.random() * 10);
  const sound = new Howl({
    src: [arr[num]],
  });

  sound.play();
  currentSound = sound;

  // const num = Math.floor(Math.random() * 10);
  //   if (soundf) {
  //     soundf.pause();
  //   }
  //   setSoundf(new Audio(arr[num]));
  //   //   const firstSound = new Audio(arr[num]);
  //   //   firstSound.play();
  //   soundf.play();
};

export default Play;
