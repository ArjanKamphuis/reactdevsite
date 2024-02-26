'use client';

import Events from "./events";
import State from "./state";
import StateArrays from "./state-arrays";
import StateObjects from "./state-object";
import StateUpdates from "./state-updates";
import TraffickLight from "./traffic-light";

export default function App(): JSX.Element {
    return (
        <div className="space-y-4">
            <StateArrays />
            <StateObjects />
            <StateUpdates />
            <TraffickLight />
            <State />
            <Events />
        </div>
    );
}
