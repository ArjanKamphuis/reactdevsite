'use client';

import DomRefs from "./dom-refs";
import { LifeCycle } from "./lifecycle";
import { NotAlwaysUseEffects } from "./not-always-use-effects";
import SynchronizingEffects from "./synchronizing-effects";
import ValueRefs from "./value-refs";

export default function App(): React.JSX.Element {
    return (
        <div className="space-y-4">
            <LifeCycle />
            <NotAlwaysUseEffects />
            <SynchronizingEffects />
            <DomRefs />
            <ValueRefs />
        </div>
    );
}
