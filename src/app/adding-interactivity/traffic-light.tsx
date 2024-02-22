import { useState } from "react";
import Button from "../common/button";

export default function TraffickLight(): JSX.Element {
    const [walk, setWalk] = useState<boolean>(true);
    
    function handleClick(): void {
        setWalk(!walk);
        alert(walk ? 'Stop is next' : 'Walk is next');
    }

    return (
        <section className="border border-black rounded-xl p-5 space-y-2">
            <h1 className="text-2xl font-bold">State as a Snapshot</h1>
            <Button onClick={handleClick}>Change to {walk ? 'Stop': 'Walk'}</Button>
            <h2 className={`text-xl font-semibold ${walk ? 'text-green-500' : 'text-red-500'}`}>{walk ? 'Walk': 'Stop'}</h2>
        </section>
    );
}
