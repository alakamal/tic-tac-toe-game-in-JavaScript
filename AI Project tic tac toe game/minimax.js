//AI project
// partners : 1 - ALaa Kamal Mashaqi , 2 - Layan Rami Malhees
// Tic Tac Toe AI with AlphaBeta Algorithm


function bestMove() {
  // AI to make its turn
  let BestResult = -Infinity;
  let move;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      // Is the spot available?
      if (XOboard[i][j] == '') {
        XOboard[i][j] = ai;
        let score = AlphaBeta(XOboard, 0, -Infinity, Infinity, false);
        XOboard[i][j] = '';
        if (score > BestResult) {
          BestResult = score;
          move = { i, j };
        }
      }
    }
  }


  //---------------------------------
  XOboard[move.i][move.j] = ai;
  currentPlayer = human;



  //---------------------------------
}

let scores = {
  X: 10,
  O: -10,
  tie: 0
};



function AlphaBeta(XOboard, depth, alpha , beta , isMaximizing) {
  let result = checkWinner();
  if (result !== null) {
    return scores[result];
  }
  // and if it's turn for the maximizing player
  // we want to find the heighest evaluation that can be obtained from this position

  if (isMaximizing) {
    let BestResult = -Infinity
   //loop through all of the children in the current position that can be reached in single move
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        // Is the spot available?
        if (XOboard[i][j] == '') {
          XOboard[i][j] = ai;
          //To find the evaluation of each child we call AlphaBeta function recaursively



          let score = AlphaBeta(XOboard/*which is the AI*/, depth + 1, alpha , beta ,  false);
          XOboard[i][j] = '';
          BestResult = max(score, BestResult);
          alpha = max(alpha, score);
          if(beta <= alpha)
            //we cut the rest of the tree
            break;
        }
      }
    }
    return BestResult;
  }
  //we do the same thing to the minimizing player
  else {
    let BestResult = Infinity;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        // Is the spot available?
        if (XOboard[i][j] == '') {
          XOboard[i][j] = human;
          let score = AlphaBeta(XOboard, depth + 1, alpha , beta ,  true);
          XOboard[i][j] = '';
          BestResult = min(score, BestResult);
          beta = min(beta,score);
          if(beta<=alpha)
            //we cut the rest of the tree
            break;
      }
      }
    }
    return BestResult;
  }
}
