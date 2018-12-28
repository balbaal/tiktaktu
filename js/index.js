// DECLARE GLOBAL VARIABLE
var boardClicks = 0;
var stackClicked = [];
var scorePlayerOTotal = 0;
var scorePlayerXTotal = 0;
var hasClicked = 0;
var scoreDraw = 0;
var squareClicks = [];
var winningPlayer;

function allSame(array) {
  var first = array[0];

  if (array[0] == "") {
    return false;
  } else {
    return array.every(function(element) {
      return element == first;
    });
  }
}

function isEven(value) {
  if (value % 2 == 0) {
    return true;
  } else {
    return false;
  }
}

function isOdd(value) {
  if (value % 1 == 0) {
    return true;
  } else {
    return false;
  }
}

function resetActive() {
  playerNameX.classList.add("active");
  scorePlayerX.classList.add("active");

  playerNameO.classList.remove("active");
  scorePlayerO.classList.remove("active");

  hasClicked = 0;
  stackClicked = [];
  boardClicks = 0;
}

function backStart() {
  $("#starter").show();
  $("#gameplay").hide();
  $("#gameplayStatus").hide();
  $("#reset-button").hide();
  $("#undo-button").hide();
  $("#back-button").hide();

  playerNameO.classList.remove("active");
  scorePlayerO.classList.remove("active");

  playerNameX.classList.remove("active");
  scorePlayerX.classList.remove("active");
}

$("#back-button").click(function() {
  backStart();
});

$("#undo-button").click(function() {
  console.log(stackClicked);
  if (stackClicked.length != 0) {
    // get last id click
    var lastArray = stackClicked.length - 1;
    $("#board > #" + stackClicked[lastArray] + " div").addClass(
      "animated bounceOut"
    );
    // remove element last clicked
    var delay = 1000;
    setTimeout(function() {
      $("#board > #" + stackClicked[lastArray]).html("");
    }, delay);
    // set 0 array clicked undo in squareClicks
    squareClicks[stackClicked[lastArray]] = 0;
    // remove array last clicked in stackClicked
    stackClicked.pop();

    console.log(hasClicked);
    console.log(boardClicks);

    hasClicked -= 1;
    boardClicks -= 1;

    if (isEven(boardClicks)) {
      playerNameX.classList.add("active");
      scorePlayerX.classList.add("active");

      playerNameO.classList.remove("active");
      scorePlayerO.classList.remove("active");
    } else {
      playerNameO.classList.add("active");
      scorePlayerO.classList.add("active");

      playerNameX.classList.remove("active");
      scorePlayerX.classList.remove("active");
    }
  } else {
    alert("Can't undo, please click the board");
  }
});

$("#reset-button").click(function() {
  $("#board .square div").addClass("animated bounceOut");

  var delay = 1000;
  setTimeout(function() {
    $(function() {
      $("#startGame").click();
      resetActive();
    });
  }, delay);
});

$("#startGame").click(function() {
  // show & hide element when click play button
  $("#reset-button").show();
  $("#undo-button").show();
  $("#back-button").show();
  $("#starter").hide();
  $("#gameplay").show();
  $("#gameplayStatus").show();

  boardClicks = 0;
  hasClicked = 0;

  var customBackground = "white";
  var boardSize = parseInt($("#boardSize").val());
  var gameBoard = [];
  var numSquares = boardSize * boardSize;

  // store game status element inside of a variable
  var playerNameO = document.getElementById("playerNameO");
  var playerNameX = document.getElementById("playerNameX");
  var scorePlayerO = document.getElementById("scorePlayerO");
  var scorePlayerX = document.getElementById("scorePlayerX");

  // set player name to gameplay status
  playerNameO.innerHTML = $("#playerO").val() + " (O)";
  playerNameX.innerHTML = $("#playerX").val() + " (X)";

  // validate starter setting
  if (
    boardSize == "" ||
    $("#playerO").val() == "" ||
    $("#playerX").val() == ""
  ) {
    alert("Please input data, before play");
    backStart();
  } else if (boardSize < 3 || boardSize > 9) {
    alert("You can't set board size, less than 3 or more than 9");
    backStart();
  }

  // make array based on number of boxes game
  for (var i = 0; i < numSquares; i++) {
    gameBoard.push(i);
  }

  $("#gameplay #content").html('<div id="board"></div>');
  // store board div inside of a variable
  var board = document.getElementById("board");

  // center board in middle of page by adding margin css
  board.style.margin = "0 auto";
  board.style.marginBottom = "200px";
  if (boardSize > 5) {
    board.style.marginTop = "150px";
  }

  // To make scalable, set wrapper div width and height 100px* board size
  board.style.height = 100 * boardSize + "px";
  board.style.width = 100 * boardSize + "px";

  // iterate over gameboard, for every index in gameboard, print to document a div
  for (var i = 0; i < numSquares; i++) {
    board.innerHTML += '<div class="square"></div>'; // Need to add += or else divs overwrite each other!!
  }

  // store square divs in a variable - need to include in global scope
  var squares = document.getElementsByClassName("square");

  var aLimits = 1;
  var bLimits = 1;

  for (var i = 0; i < numSquares; i++) {
    var columnLimits = numSquares - boardSize;

    // HIDE THE OOUTLINE OF THE GAME BOARD
    // first column
    if (aLimits <= boardSize) {
      if (bLimits == 1) {
        squares[i].style.borderTop = "0px solid white";
        squares[i].style.borderLeft = "0px solid white";
        console.log("haaa");
      } else if (bLimits == boardSize) {
        squares[i].style.borderTop = "0px solid white";
        squares[i].style.borderRight = "0px solid white";
      } else {
        squares[i].style.borderTop = "0px solid white";
      }
    }
    // last column
    else if (aLimits <= columnLimits) {
      if (bLimits == 1) {
        squares[i].style.borderLeft = "0px solid white";
        console.log("haaa");
      } else if (bLimits == boardSize) {
        squares[i].style.borderRight = "0px solid white";
      }
      // inside column
    } else {
      if (bLimits == 1) {
        squares[i].style.borderBottom = "0px solid white";
        squares[i].style.borderLeft = "0px solid white";
        console.log("haaa");
      } else if (bLimits == boardSize) {
        squares[i].style.borderBottom = "0px solid white";
        squares[i].style.borderRight = "0px solid white";
      } else {
        squares[i].style.borderBottom = "0px solid white";
      }
    }

    aLimits++;
    bLimits++;
    if (bLimits > boardSize) bLimits = 1;

    // set div squares to 100px x 100px
    squares[i].style.height = "100px";
    squares[i].style.width = "100px";
    // Float square divs left
    squares[i].style.float = "left";
    // Set div line height to 100px
    squares[i].style.lineHeight = "100px";
    // Set unique DIV IDs to each square
    squares[i].setAttribute("id", i.toString());
  }

  // set default highlight style, who first play game
  playerNameX.classList.add("active");
  scorePlayerX.classList.add("active");

  // If board is clicked, increment global click counter
  board.addEventListener("click", function() {
    if (determineWinner()) {
    } else if (isEven(boardClicks)) {
      // set class highlight game status, who is play
      playerNameO.classList.add("active");
      scorePlayerO.classList.add("active");
      playerNameX.classList.remove("active");
      scorePlayerX.classList.remove("active");
    } else {
      playerNameX.classList.add("active");
      scorePlayerX.classList.add("active");
      playerNameO.classList.remove("active");
      scorePlayerO.classList.remove("active");
    }

    boardClicks++;
  });

  // set squareclick data for each square to 0
  for (var i = 0; i < numSquares; i++) {
    squareClicks[i] = 0;
  }

  // add function to determine winner based on clicks array
  var determineWinner = function() {
    // CHECK WINNING PLAYER BY ROW
    for (i = 0; i < numSquares; i += 1) {
      // iterate over entire board
      if (i % boardSize == 0) {
        var rowCheckWinning = [];
        for (var squareNum = i; squareNum < i + boardSize; squareNum += 1) {
          // iteration over column 1
          rowCheckWinning.push(squares[squareNum].innerHTML);
        }

        if (allSame(rowCheckWinning)) {
          winningPlayer = rowCheckWinning; // Push winning player data
          return true;
        }
      }
    }

    // CEHCK WINNING PLAYER BY COLUMN
    for (i = 0; i < numSquares; i += 1) {
      // iterate over entire board
      if (i < boardSize) {
        //
        var colCheckWinning = [];
        for (
          var squareNum = i;
          squareNum < numSquares;
          squareNum += boardSize
        ) {
          // iteration over row 1
          colCheckWinning.push(squares[squareNum].innerHTML);
        }

        if (allSame(colCheckWinning)) {
          winningPlayer = colCheckWinning; // Push winning player data
          return true;
        }
      }
    }

    // CHECK WINNING PLAYER BY DIAGONAL LEFT
    var diagLeftCheckWinning = []; // Needs to be outside of for loop to prevent overwriting array
    for (i = 0; i < numSquares; i += 1) {
      // first iteration over board
      if (i % (boardSize + 1) == 0) {
        // use condition if iterator % BOARDSIZE + 1 === 0 to get left diagonals
        diagLeftCheckWinning.push(squares[i].innerHTML);
      }
    }

    if (allSame(diagLeftCheckWinning)) {
      // As does the return statement
      winningPlayer = diagLeftCheckWinning; // Push winning player data
      return true;
    }

    // CHECK WINNING PLAYER BY DIAGONAL RIGHT
    var diagRightCheckWinning = []; // Needs to be outside of for loop to prevent overwriting array
    for (i = boardSize - 1; i < numSquares - 1; i += 1) {
      // first iteration over board
      if (i % (boardSize - 1) == 0) {
        // use condition if iterator % BOARDSIZE - 1 === 0 to get right diagonals
        diagRightCheckWinning.push(squares[i].innerHTML);
      }
    }
    if (allSame(diagRightCheckWinning)) {
      // As does the return statement
      winningPlayer = diagRightCheckWinning; // Push winning player data
      return true;
    }
  }; // End determineWinner function

  // Add function to count square clicks
  var countClicks = function() {
    var divID = this.getAttribute("id");
    stackClicked.push(divID);

    squareClicks[divID] += 1;
    // If global click counter is odd and local click is == 1, change innerhtml of div to 'X'
    if (isEven(boardClicks) && squareClicks[divID] == 1) {
      this.innerHTML = "<div>X</div>";
      this.style.color = "#4285f4";
      hasClicked++;

      // adding animation shake
      $("#" + divID + " div").addClass("animated bounceIn");

      // If global click counter is even and local click is == 1, change innerhtml of div to 'O'
    } else if (isOdd(boardClicks) && squareClicks[divID] == 1) {
      this.innerHTML = "<div>O</div>";
      this.style.color = "#4285f4";
      hasClicked++;

      // adding animation shake
      $("#" + divID + " div").addClass("animated bounceIn");

      // If local click counter is greater than 1, alert player and subtract 1 from global clicks
    } else if (!determineWinner()) {
      alert("This Space has been filled.");
      boardClicks -= 1;
      stackClicked.pop();
    } else {
    }
    // Check for winner, if true, lock all local clicks
    if (determineWinner()) {
      // Set all square clicks to 2 to "lock" them to prevent further moves from taking place
      for (var i = 0; i < numSquares; i++) {
        squareClicks[i] = 2;
      }

      // set value to gameplay score
      winningPlayer[0] = $(winningPlayer[0] + " div").text();
      if (winningPlayer[0] == "X") {
        if (hasClicked != 0) scorePlayerXTotal++;
        scorePlayerX.innerHTML = "<div>" + scorePlayerXTotal + "</div>";
        $("#scorePlayerX div").addClass("animated bounceIn");
        playerWin = $("#playerX").val() + " (X)";
        hasClicked = 0;
      } else {
        if (hasClicked != 0) scorePlayerOTotal++;
        scorePlayerO.innerHTML = "<div>" + scorePlayerOTotal + "</div>";
        $("#scorePlayerO div").addClass("animated bounceIn");
        playerWin = $("#playerO").val() + " (O)";
        hasClicked = 0;
      }

      res_confirm = confirm(playerWin + " Winner, Play Again ???");
      if (res_confirm) {
        $(function() {
          $("#startGame").click();
          resetActive();
        });
      } else {
        hasClicked = 0;
      }
    } else {
      if (hasClicked == numSquares) {
        console.log(hasClicked);
        console.log(numSquares);
        scoreDraw++;

        res_confirm = confirm("Draw, Play Again ???");
        if (res_confirm) {
          $("#scoreDraw").html("<div>" + scoreDraw + "</div>");
          $("#scoreDraw div").addClass("animated bounceIn");

          $(function() {
            playerNameX.classList.remove("active");
            scorePlayerX.classList.remove("active");

            playerNameO.classList.remove("active");
            scorePlayerO.classList.remove("active");
            $("#startGame").click();
          });
        } else {
          scoreDraw--;
          $("#scoreDraw").html(scoreDraw);
        }
      }
    }
  };

  // Add local click counter to each square on the board
  for (var i = 0; i < numSquares; i++) {
    squares[i].addEventListener("click", countClicks);
  }
});
