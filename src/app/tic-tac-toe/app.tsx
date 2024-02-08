'use client';

import { useState } from "react";
import "./styles.css";

type SquareType = Array<string | null>;

interface SquareProps {
    value: string | null;
    onSquareClick: () => void;
}
interface BoardProps {
    xIsNext: boolean;
    squares: SquareType;
    onPlay: (nextSquares: SquareType) => void;
}

function Square({ value, onSquareClick }: SquareProps): JSX.Element {
    return <button className="square" onClick={onSquareClick}>{value}</button>;
}

function Board({ xIsNext, squares, onPlay }: BoardProps): JSX.Element {
    function handleClick(i: number): void {
        if (squares[i] || calculateWinner(squares)) return;
        const nextSquares: SquareType = squares.slice();
        nextSquares[i] = xIsNext ? 'X' : 'O';
        onPlay(nextSquares);
    }
    
    return (
        <>
            <div className="status w-40 text-center">{calculateStatus(squares, xIsNext)}</div>
            <div className="board w-40 flex flex-col justify-center items-center">
                {[0, 1, 2].map((row: number) => (
                    <div key={row} className="board-row">
                        {[
                            3 * row + 0, 
                            3 * row + 1, 
                            3 * row + 2
                        ].map((cell: number) => (
                            <Square key={cell} value={squares[cell]} onSquareClick={() => handleClick(cell) } />
                        ))}
                    </div>
                ))}
            </div>
        </>
    );
}

export default function Game(): JSX.Element {
    const [history, setHistory] = useState<SquareType[]>([Array(9).fill(null)]);
    const [currentMove, setCurrentMove] = useState<number>(0);
    const [reverseHistory, setReverseHistory] = useState<boolean>(false);
    const xIsNext = currentMove % 2 === 0;
    const currentSquares: SquareType = history[currentMove];

    function handlePlay(nextSquares: SquareType) {
        const nextHistory: Array<SquareType> = [...history.slice(0, currentMove + 1), nextSquares];
        setHistory(nextHistory);
        setCurrentMove(nextHistory.length - 1);
    }

    function jumpTo(nextMove: number) {
        setCurrentMove(nextMove);
    }

    let moves = history.map((_, move: number) => {
        if (move === currentMove) return <li key={move}>You are at move #{move}</li>;
        const description: string = move > 0 ? `Go to move #${move}` : 'Go to game start';
        return (
            <li key={move}>
                <button className="bg-gray-400 hover:bg-gray-500 py-1 px-2 rounded" onClick={() => jumpTo(move)}>{description}</button>
            </li>
        );
    });
    if (reverseHistory) moves = moves.reverse();

    return (
        <div className="game">
            <div className="game-board">
                <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
            </div>
            <div className="game-info space-y-4">
                <button className="bg-gray-400 hover:bg-gray-500 py-1 px-2 rounded" onClick={() => setReverseHistory(!reverseHistory)}>Toggle history order</button>
                <ol className="space-y-1">{moves}</ol>
            </div>
        </div>
    );
}

function calculateWinner(squares: SquareType): string | null {
    const lines: Array<Array<number>> = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    for (let i: number = 0; i < lines.length; i++) {
        const [a, b, c]: Array<number> = lines[i];
        if (squares[a] && squares[a] == squares[b] && squares[a] == squares[c]) {
            return squares[a];
        }
    }
    return null;
}

function isBoardFull(squares: SquareType): boolean {
    return squares.lastIndexOf(null) === -1;
}

function calculateStatus(squares: SquareType, xIsNext: boolean): string {
    const winner: string | null = calculateWinner(squares);

    if (winner) return `Winner: ${winner}`;
    if (isBoardFull(squares)) return "It's a draw!";
    return `Next player: ${xIsNext ? 'X' : 'O'}`;    
}
