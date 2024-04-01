import { useRef, useState } from "react";
import useCounter from "./useCounter";
import useInterval from "./useInterval";
import RangeInputField from "@/app/common/RangeInputfield";

export default function CustomCounter(): React.JSX.Element {
    const [count, counterDelay, setCounterDelay] = useCounter();
    const [bgDelay, setBgDelay] = useState<number>(2000);
    const divRef = useRef<HTMLDivElement | null>(null);

    useInterval<[]>(() => {
        if (divRef.current === null) return;
        const randomColor: string = `hsla(${Math.random() * 360}, 100%, 50%, 0.2)`;
        divRef.current.style.backgroundColor = randomColor;
    }, bgDelay);

    return (
        <div className="space-y-2 p-2 rounded-xl" ref={divRef}>
            <div className="flex justify-between">
                <RangeInputField label={`Seconds tick: ${counterDelay}ms`} inputProps={{ value: counterDelay, min: 10, max: 2000, onChange: e => setCounterDelay(Number(e.target.value)) }} />
                <RangeInputField label={`Background tick: ${bgDelay}ms`} inputProps={{ value: bgDelay, min: 100, max: 4000, onChange: e => setBgDelay(Number(e.target.value)) }} />
            </div>
            <hr className="border-black" />
            <h2 className="text-xl font-semibold">Seconds passed: {count}</h2>
        </div>
    );
}


