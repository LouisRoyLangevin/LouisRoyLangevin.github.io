import {useState} from 'react';

function Square({value, onSquareClick}) {
    return (
    <button 
        className="square"
        onClick={onSquareClick}
    >
        {value}
    </button>
    )
}

function calculateWinner(squares) {
    const lines = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ]
    
    for (let i = 0; i < 8; i++) {
        const [a,b,c] = lines[i];
        if (squares[a] && squares[a] == squares[b] && squares[b] == squares[c]) return squares[a];
    }
    return null;
}

function Board({xIsNext, squares, onPlay}) {
    function handleClick(i) {
        if (squares[i] || calculateWinner(squares)) return;
        const nextSquares = squares.slice();
        if (xIsNext) nextSquares[i] = "X";
        else nextSquares[i] = "O";
        onPlay(nextSquares);
    }
    const winner = calculateWinner(squares);
    let status;
    if (winner) status = "Winner: " + winner;
    else status = "Next player: " + (xIsNext ? "X" : "O");

    const arr = [0,3,6];
    const theBoard = arr.map((num1,key) => {
        const arr1 = [0,1,2];
        const theRow = arr1.map((num2,key) => {
            let num = num1 + num2;
            return (
                <Square key = {num} value={squares[num]} onSquareClick={() => handleClick(num)}/>
            )
        })
        return (
            <div key={num1} className="board-row">
                {theRow}
            </div>
        )
    })
    return <>
        <div id="status">{status}</div>
        {theBoard}
    </>
}

export default function Game() {
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [currentMove, setCurrentMove] = useState(0);
    const xIsNext = currentMove % 2 === 0;
    const currentSquares = history[currentMove];

    function handlePlay(nextSquares) {
        const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
        setHistory(nextHistory);
        setCurrentMove(nextHistory.length-1);
    }

    function jumpTo(nextMove) {
        setCurrentMove(nextMove);
    }

    const moves = history.map((squares, move) => {
        let description = "Go to " + ((move > 0) ? "move " + move : "game start");
        return ( 
            <li key={move}>
                <button onClick={() => jumpTo(move)}>{description}</button>
            </li>
        )
    })
    return (
        <div className="game">
            <div className="game-board">
                <Board xIsNext = {xIsNext} squares={currentSquares} onPlay={handlePlay}/>
            </div>
            <div className="game-info">
                <ol>{moves}</ol>
            </div>
        </div>
    )
}