import Button from "@/app/common/button";
import { useEffect, useState } from "react";

export default function IncrementalTimer(): React.JSX.Element {
    const [count, setCount] = useState<number>(0);
    const [increment, setIncrement] = useState<number>(0);

    useEffect(() => {
        const id: NodeJS.Timeout = setInterval(() => {
            setCount(c => c + increment);
        }, 1000);
        return () => { clearInterval(id) };
    }, [increment]);

    return (
        <div className="space-y-2">
            <div className="flex space-x-2 items-center">
                <h2 className="text-xl font-semibold">Counter: {count}</h2>
                <Button onClick={() => setCount(0)}>Reset</Button>
            </div>
            <hr className="border-black" />
            <div className="flex space-x-2 items-center">
                <span>Every second, increment by:</span>
                <Button disabled={increment === 0} onClick={() => setIncrement(i => i - 1)}>-</Button>
                <b>{increment}</b>
                <Button onClick={() => setIncrement(i => i + 1)}>+</Button>
            </div>
        </div>
    );
}
