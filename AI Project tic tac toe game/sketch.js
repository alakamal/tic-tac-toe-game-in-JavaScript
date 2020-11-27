// Tic Tac Toe AI with AlphaBeta Algorithm
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/154-tic-tac-toe-AlphaBeta.html
// https://youtu.be/I64-UTORVfU
// https://editor.p5js.org/codingtrain/sketches/0zyUhZdJD

let XOboard = [
  ['', '', ''],
  ['', '', ''],
  ['', '', '']
];

let w; // = width / 3;
let h; // = height / 3;
let ai = 'X';
let human = 'O';
let currentPlayer = human;

function setup() {
  createCanvas(400, 400);
  w = width / 3;
  h = height / 3;
  bestMove();
}




//a function to check if they are equal to each other
function equals3(a, b, c) {
  return a == b && b == c && a != '';
}
function checkWinner() {
  let winner = null;
  // horizontal
  for (let i = 0; i < 3; i++) {
    if (equals3(XOboard[i][0], XOboard[i][1], XOboard[i][2])) {
      winner = XOboard[i][0];
    }
  }



  // Vertical
  for (let i = 0; i < 3; i++) {
    if (equals3(XOboard[0][i], XOboard[1][i], XOboard[2][i])) {
      winner = XOboard[0][i];
    }
  }



  // Diagonal
  if (equals3(XOboard[0][0], XOboard[1][1], XOboard[2][2])) {
    winner = XOboard[0][0];
  }


  if (equals3(XOboard[2][0], XOboard[1][1], XOboard[0][2])) {
    winner = XOboard[2][0];
  }



  //we calculate the number of the open spots because we're going to use it
  //to find the result if it's tie

  let openSpots = 0;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (XOboard[i][j] == '') {
        openSpots++;
      }
    }
  }


  // if there is no winner and the result is ti

  if (winner == null && openSpots == 0) {
    return 'tie';
  } else {
    return winner;
  }
}


//current player human draw O or

function mousePressed() {
  if (currentPlayer == human) {
    // Human make turn
    let i = floor(mouseX / w);
    let j = floor(mouseY / h);
    // If valid turn
    if (XOboard[i][j] == '') {
      XOboard[i][j] = human;

      currentPlayer = ai;
      bestMove();
    }
  }
}




function draw() {

  background(255);
  strokeWeight(4);

//Drawing the lines for the game

  line(w, 0, w, height);
  line(w * 2, 0, w * 2, height);
  line(0, h, width, h);
  line(0, h * 2, width, h * 2);




  for (let j = 0; j < 3; j++) {
    for (let i = 0; i < 3; i++) {
      let x = w * i + w / 2;
      let y = h * j + h / 2;
      let spot = XOboard[i][j];
      textSize(32);
      let r = w / 4;
      if (spot == human) {
        noFill();
        ellipse(x, y, r * 2);
      }
      else if (spot == ai) {
        line(x - r, y - r, x + r, y + r);
        line(x + r, y - r, x - r, y + r);
      }
    }
  }

  let result = checkWinner();
  if (result != null) {
    noLoop();
    let resultP = createP('');
    resultP.style('font-size', '32pt' );
  resultP.style('color','red');
    if (result == 'tie') {
      resultP.html('The result is Tie');
    } else {
      resultP.html(`The Winer is ${result} `);
    }
  }
}
