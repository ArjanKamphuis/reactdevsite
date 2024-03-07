import Button from "@/app/common/button";
import { useEffect, useState } from "react";

function Counter(): React.JSX.Element {
    const [count, setCount] = useState<number>(0);

    useEffect(() => {
        function onTick(): void {
            setCount(c => c + 1);
        }
        const intervalId: NodeJS.Timeout = setInterval(onTick, 1000);
        return () => { clearInterval(intervalId); }
    }, []);

    return <p className="text-lg font-medium">{count}</p>
}

export default function CounterApp(): React.JSX.Element {
    const [show, setShow] = useState<boolean>(false);
    return (
        <div className="space-y-2">
            <Button onClick={() => setShow(!show)}>{show ? 'Hide' : 'Show'} counter</Button>
            <hr className="border-black" />
            {show && <Counter />}
        </div>
    );
}
