import { useState } from "react";

function Square({ value, onSquareClick }) {
  return (
    <button
      onClick={onSquareClick}
      className="bg-white border border-gray-400 h-20 w-20 m-1 leading-9 font-bold text-[50px]"
    >
      {value}
    </button>
  );
}

function Board({xIsNext, squares,onPlay}) {


  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else {
    status = "Next Player" + (xIsNext ? "X" : "0");
  }

  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    onPlay(nextSquares);
  }
  return (
    <>
      <div className="text-7xl font-bold mb-5">{status}</div>
      <div className="flex">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>

      <div className="flex">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>

      <div className="flex">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [xIsNext, setXIsNext] = useState(true);
  const [currentMove, setCurrentMove] = useState(0)

  const currentSqures = history[currentMove];

  function handlePlayer(nextSquares) {
    setXIsNext(!xIsNext)
    const nextHistory = [...history.slice(0,currentMove + 1), nextSquares]
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length -1)
  }

function jumpTo(move) {
  setCurrentMove(move);
  setXIsNext(move % 2  === 0)
}

  const moves = history.map((squres,move) => {
    let description;
    if(move > 0 ) {
      description = `Go to the move number # ${move}`
    }else{
      description = `Go to the start Game`
    }
    return(
      <li key={move}>
        <button className="btn bg-amber-800 mb-4 text-white p-1 rounded cursor-pointer" onClick={() => jumpTo(move)}>{description}</button>
      </li>
    )
  })

  console.log(moves);
  return (
    <div className="flex gap-10 justify-center items-center min-h-screen">
      <div>
        <Board xIsNext={xIsNext}  squares={currentSqures} onPlay={handlePlayer}/>
      </div>
      <div>
        <ol>
          {moves}
        </ol>
      </div>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
