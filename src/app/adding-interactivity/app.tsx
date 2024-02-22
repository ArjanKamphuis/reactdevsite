'use client';

import Events from "./events";
import State from "./state";
import StateUpdates from "./state-updates";
import TraffickLight from "./traffic-light";

export default function App(): JSX.Element {
    return (
        <div className="space-y-4">
            <StateUpdates />
            <TraffickLight />
            <State />
            <Events />
        </div>
    );
}
