// Frame Images
import frame1 from "./images/frames/frame-1.png";
import frame2 from "./images/frames/frame-2.png";
import frame3 from "./images/frames/frame-3.png";
import frame4 from "./images/frames/frame-4.png";
import frame5 from "./images/frames/frame-5.png";
import frame6 from "./images/frames/frame-6.png";
import frame7 from "./images/frames/frame-7.png";
import frame8 from "./images/frames/frame-8.png";
import frame9 from "./images/frames/frame-9.png";
import frame10 from "./images/frames/frame-10.png";
import frame11 from "./images/frames/frame-11.png";
import frame12 from "./images/frames/frame-12.png";

// Portrait Images
import portrait13 from "./images/portraits/portrait-13.png";
import portrait11 from "./images/portraits/portrait-11.png";
import portrait2 from "./images/portraits/portrait-2.png";
import portrait8 from "./images/portraits/portrait-8.png";
import portrait14 from "./images/portraits/portrait-14.png";
import portrait7 from "./images/portraits/portrait-7.png";
import portrait10 from "./images/portraits/portrait-10.png";
import portrait5 from "./images/portraits/portrait-5.png";
import portrait3 from "./images/portraits/portrait-3.png";
import portrait12 from "./images/portraits/portrait-12.png";
import portrait4 from "./images/portraits/portrait-4.png";
import portrait6 from "./images/portraits/portrait-6.png";

// Prizes Images
import prize1 from "./images/prizes/beauregard.png";
import prize2 from "./images/prizes/helen.png";
import prize3 from "./images/prizes/matthew.png";
import prize4 from "./images/prizes/mr-sam.png";
import prize5 from "./images/prizes/sohan.png";
import prize6 from "./images/prizes/teddy.png";

export const frames = [
  frame1,
  frame2,
  frame3,
  frame4,
  frame5,
  frame6,
  frame7,
  frame8,
  frame9,
  frame10,
  frame11,
  frame12,
];

// 13 11 2 8 14 7 10 5 3 12 4 6
export const portraits = [
  portrait13,
  portrait11,
  portrait2,
  portrait8,
  portrait14,
  portrait7,
  portrait10,
  portrait5,
  portrait3,
  portrait12,
  portrait4,
  portrait6,
];

const prizes = [prize1, prize2, prize3, prize4, prize5, prize6];

export const shuffledPrizes = prizes
  .concat(prizes)
  .map((a) => ({ sort: Math.random(), value: a }))
  .sort((a, b) => a.sort - b.sort)
  .map((a) => a.value);
