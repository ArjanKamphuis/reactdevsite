'use client';

import DomRefs from "./dom-refs";
import SynchronizingEffects from "./synchronizing-effects";
import ValueRefs from "./value-refs";

export default function App(): React.JSX.Element {
    return (
        <div className="space-y-4">
            <SynchronizingEffects />
            <DomRefs />
            <ValueRefs />
        </div>
    );
}
