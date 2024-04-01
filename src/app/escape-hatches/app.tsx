'use client';

import CustomHooks from "./custom-hooks";
import DomRefs from "./dom-refs";
import { LifeCycle } from "./lifecycle";
import { NotAlwaysUseEffects } from "./not-always-use-effects";
import RemovingEffectDependencies from "./removing-effect-dependencies";
import SeparateEventsFromEffects from "./separate-events-from-effect";
import SynchronizingEffects from "./synchronizing-effects";
import ValueRefs from "./value-refs";

export default function App(): React.JSX.Element {
    return (
        <div className="space-y-4">
            <CustomHooks />
            <RemovingEffectDependencies />
            <SeparateEventsFromEffects />
            <LifeCycle />
            <NotAlwaysUseEffects />
            <SynchronizingEffects />
            {/* <DomRefs /> */}
            <ValueRefs />
        </div>
    );
}
