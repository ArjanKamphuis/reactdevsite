'use client';

import { ComponentType } from "react";
import dynamic from "next/dynamic";
import InputWithState from "./input-with-state";
import SharingState from "./sharing-state";
import PreservingAndResettingState from "./preserving-and-resetting-state";

const StateStructure: ComponentType<{}> = dynamic(() => import('./state-structure'), { ssr: false })

export default function App(): JSX.Element {
    return (
        <div className="space-y-4">
            <PreservingAndResettingState />
            <SharingState />
            <StateStructure />
            <InputWithState />
        </div>
    );
}
