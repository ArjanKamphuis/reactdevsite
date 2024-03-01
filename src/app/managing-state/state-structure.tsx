import { useEffect, useState } from "react";
import TravelPlan from "./travel-plan";
import Button from "../common/button";
import { LetterType, letters as initialLetters } from "./letters";
import MultipleSelectionMailbox from "./multiple-selection";

type ClockProps = {
    color: string;
    time: Date;
}

type HoverHandler = (letterId: number | null) => void;
type ToggleStarHandler = (starredId: number) => void;

type LetterProps = {
    letter: LetterType;
    isHighlighted: boolean;
    onHover: HoverHandler;
    onToggleStar: ToggleStarHandler;
};

function Clock({ color, time }: ClockProps): JSX.Element {
    return <h2 className="text-xl font-semibold" style={{ color: color }}>{time.toLocaleTimeString()}</h2>
}

function ClockApp(): JSX.Element {
    const [color, setColor] = useState<string>('lightcoral');
    const time: Date = useTime();
    return (
        <div>
            <div className="space-x-2">
                <span>Pick a color:</span>
                <select className="border border-black rounded px-2 py-1" value={color} onChange={e => setColor(e.target.value)}>
                    <option value="lightcoral">lightcoral</option>
                    <option value="midnightblue">midnightblue</option>
                    <option value="rebeccapurple">rebeccapurple</option>
                </select>
            </div>
            <Clock color={color} time={time} />
        </div>
    );
}

function Letter({ letter, isHighlighted, onHover, onToggleStar }: LetterProps): JSX.Element {
    const liClasses: string = `space-x-2 px-2 py-1 rounded-xl${isHighlighted ? ' bg-[#d2eaff]' : ''}`;
    return (
        <li className={liClasses} onFocus={() => onHover(letter.id)} onPointerOut={() => onHover(null)} onPointerMove={() => onHover(letter.id)}>
            <span>&#128231;</span>
            <Button onClick={() => onToggleStar(letter.id)}>{letter.isStarred ? 'Unstar' : 'Star'}</Button>
            <span>{letter.subject}</span>
        </li>
    );
}

function MailClient(): JSX.Element {
    const [letters, setLetters] = useState<LetterType[]>(initialLetters);
    const [highlightedId, setHighlightedId] = useState<number | null>(null);
    
    const handleHover:      HoverHandler      = (letterId)  => setHighlightedId(letterId);
    const handleToggleStar: ToggleStarHandler = (starredId) => setLetters(letters.map(letter => letter.id === starredId ? { ...letter, isStarred: !letter.isStarred } : letter));

    return (
        <div className="space-y-2">
            <h2 className="text-xl font-semibold">Inbox</h2>
            <ul className="space-y-2">
                {letters.map(letter => <Letter key={letter.id} letter={letter} isHighlighted={letter.id === highlightedId} onHover={handleHover} onToggleStar={handleToggleStar} />)}
            </ul>
        </div>
    );
}

export default function StateStructure(): JSX.Element {
    return (
        <section className="border border-black rounded-xl p-5 space-y-4 w-[512px]">
            <h1 className="text-2xl font-bold">Choosing the State Structure</h1>
            <MultipleSelectionMailbox />
            <MailClient />
            <TravelPlan />
            <ClockApp />
        </section>
    );
}

function useTime(): Date {
    const [time, setTime] = useState<Date>(() => new Date());
    useEffect(() => {
        const id: NodeJS.Timeout = setInterval(() => { setTime(new Date()); }, 1000);
        return () => clearInterval(id);
    });
    return time;
}
