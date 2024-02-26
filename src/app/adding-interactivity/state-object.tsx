import { ChangeEvent, PointerEvent, useState } from "react";
import Button from "../common/button";
import TextInput from "../common/textInput";
import { useImmer } from "use-immer";

type Player = {
    firstName: string;
    lastName: string;
    score: number;
};

type Position = {
    x: number;
    y: number;
};

type Shape = {
    color: string;
    position: Position;
};

type BoxProperties = {
    children: React.ReactNode;
    color: string;
    position: Position;
    onMove: (dx: number, dy: number) => void;
};

function Scoreboard(): JSX.Element {
    const [player, setPlayer] = useState<Player>({
        firstName: 'Ranjani',
        lastName: 'Shettar',
        score: 10
    });

    function handlePlusClick(): void {
        setPlayer({
            ...player,
            score: player.score + 1
        });
    }

    function handleInputChange(e: ChangeEvent<HTMLInputElement>): void {
        setPlayer({
            ...player,
            [e.target.name]: e.target.value
        });
    }

    return (
        <div className="flex flex-col space-y-1">
            <label className="font-semibold">Score: <b>{player.score}</b> <Button onClick={handlePlusClick}>+1</Button></label>
            <div className="flex items-center">
                <div className="w-1/3">
                    <label className="font-semibold" htmlFor="firstName">First name:</label>
                </div>
                <div className="w-2/3">
                    <TextInput value={player.firstName} onChange={handleInputChange} id="firstName" name="firstName" />
                </div>
            </div>
            <div className="flex items-center">
                <div className="w-1/3">
                    <label className="font-semibold" htmlFor="lastName">Last name:</label>
                </div>
                <div className="w-2/3">
                    <TextInput value={player.lastName} onChange={handleInputChange} id="lastName" name="lastName" />
                </div>
            </div>
        </div>
    );
}

function Background({ position }: { position: Position }): JSX.Element {
    return (
        <div className="absolute bg-[#C8C800]/[0.2] w-60 h-60"
            style={{transform: `translate(${position.x}px, ${position.y}px)`}} />
    );
}

function Box({children, color, position, onMove}: BoxProperties): JSX.Element {
    const [lastCoordinates, setLastCoordinates] = useState<Position | null>(null);

    function handlePointerDown(e: PointerEvent<HTMLDivElement>): void {
        (e.target as HTMLDivElement).setPointerCapture(e.pointerId);
        setLastCoordinates({ x: e.clientX, y: e.clientY });
    }

    function handlePointerMove(e: PointerEvent<HTMLDivElement>): void {
        if (lastCoordinates) {
            setLastCoordinates({ x: e.clientX, y: e.clientY });
            onMove(e.clientX - lastCoordinates.x, e.clientY - lastCoordinates.y);
        }
    }

    function handlePointerUp(e: PointerEvent<HTMLDivElement>): void {
        setLastCoordinates(null);
    }

    return (
        <div onPointerDown={handlePointerDown} onPointerMove={handlePointerMove} onPointerUp={handlePointerUp}
            className="absolute w-24 h-24 cursor-grab border boder-black flex justify-center items-center"
            style={{ backgroundColor: color, transform: `translate(${position.x}px, ${position.y}px)` }}
        >{children}</div>
    );
}

const initialPosition: Position = { x: 0, y: 0 };

function Canvas(): JSX.Element {
    const [shape, setShape] = useState<Shape>({ color: 'orange', position: initialPosition });
    const handleMove:        (dx: number, dy: number)            => void = (dx, dy) => setShape({ ...shape, position: { x: shape.position.x + dx, y: shape.position.y + dy } });
    const handleColorChange: (e: ChangeEvent<HTMLSelectElement>) => void = e        => setShape({ ...shape, color: e.target.value });
    return renderCanvas(shape, handleColorChange, handleMove);
}

function CanvasImmer(): JSX.Element {
    const [shape, updateShape] = useImmer<Shape>({ color: 'orange', position: initialPosition });
    const handleMove:        (dx: number, dy: number)            => void = (dx, dy) => updateShape(draft => { draft.position.x += dx, draft.position.y += dy });
    const handleColorChange: (e: ChangeEvent<HTMLSelectElement>) => void = e        => updateShape(draft => { draft.color = e.target.value });
    return renderCanvas(shape, handleColorChange, handleMove);
}

export default function StateObjects(): JSX.Element {
    return (
        <section className="border border-black rounded-xl space-y-4 p-5 w-fit">
            <h1 className="text-2xl font-bold">Updating Objects in State</h1>
            <Scoreboard />
            <Canvas />
            <CanvasImmer />
        </section>
    )
}

function renderCanvas(shape: Shape, handleColorChange: (e: ChangeEvent<HTMLSelectElement>) => void, handleMove: (dx: number, dy: number) => void): JSX.Element {
    return (
        <div className="w-72 h-72">
            <select className="mb-2 border border-black rounded px-2 py-1" value={shape.color} onChange={handleColorChange}>
                <option value="orange">orange</option>
                <option value="lightpink">pink</option>
                <option value="aliceblue">aliceblue</option>
            </select>
            <Background position={initialPosition} />
            <Box color={shape.color} position={shape.position} onMove={handleMove}>Drag me!</Box>
        </div>
    );
}
