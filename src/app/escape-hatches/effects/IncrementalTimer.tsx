import Button from "@/app/common/button";
import { useEffect, useState } from "react";
import { useEffectEvent } from "./useEffectEvent";

export default function IncrementalTimer(): React.JSX.Element {
    const [count, setCount] = useState<number>(0);
    const [increment, setIncrement] = useState<number>(0);
    const [delay, setDelay] = useState<number>(100);

    const onTick: () => void = useEffectEvent(() => {
        setCount(c => c + increment);
    });

    useEffect(() => {
        const id: NodeJS.Timeout = setInterval(() => {
            onTick();
        }, delay);
        return () => { clearInterval(id) };
    }, [onTick, delay]);

    return (
        <div className="space-y-2">
            <div className="flex space-x-2 items-center">
                <h2 className="text-xl font-semibold">Counter: {count}</h2>
                <Button onClick={() => setCount(0)}>Reset</Button>
            </div>
            <hr className="border-black" />
            <div className="flex space-x-2 items-center">
                <span>Increment by:</span>
                <Button disabled={increment === 0} onClick={() => setIncrement(i => i - 1)}>-</Button>
                <b>{increment}</b>
                <Button onClick={() => setIncrement(i => i + 1)}>+</Button>
            </div>
            <div className="flex space-x-2 items-center">
                <span>Increment delay:</span>
                <Button disabled={delay === 100} onClick={() => setDelay(d => d - 100)}>-100ms</Button>
                <b>{delay} ms</b>
                <Button onClick={() => setDelay(d => d + 100)}>+100ms</Button>
            </div>
        </div>
    );
}
