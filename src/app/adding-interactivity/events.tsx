import { MouseEvent, useState } from "react";
import Button from "../common/button";

function Lightswitch(): JSX.Element {
    function handleClick(): void {
        const bodyStyle: CSSStyleDeclaration = document.body.style;
        bodyStyle.backgroundColor = bodyStyle.backgroundColor === 'black' ? 'white' : 'black';
    }
    return <Button onClick={handleClick}>Toggle the lights</Button>
}

function ColorSwitch({ onChangeColor }: { onChangeColor: () => void }): JSX.Element {
    return <Button onClick={(e: MouseEvent) => { e.stopPropagation(); onChangeColor(); }}>Change color</Button>;
}

function ColorSwitchApp(): JSX.Element {
    const [clicks, setClicks] = useState<number>(0);
    const handleClickOutside: () => void = () => setClicks((c: number) => c + 1);

    function getRandomLightColor(): string {
        const r = 150 + Math.round(100 * Math.random());
        const g = 150 + Math.round(100 * Math.random());
        const b = 150 + Math.round(100 * Math.random());
        return `rgb(${r}, ${g}, ${b})`;
    }

    const handleChangeColor: () => void = () => document.body.style.backgroundColor = getRandomLightColor();

    return (
        <div className="space-y-2" onClick={handleClickOutside}>
            <ColorSwitch onChangeColor={handleChangeColor} />
            <h2 className="text-xl font-semibold">Clicks on the page: {clicks}</h2>
        </div>
    );
}

export default function Events(): JSX.Element {
    return (
        <section className="border border-black rounded-xl p-5 space-y-4 w-fit">
            <h1 className="text-2xl font-bold">Responding to Events</h1>
            <Lightswitch />
            <ColorSwitchApp />
        </section>
    );
}
