import { useState } from "react";
import { TextInputChangeEventHandler } from "../common/textInput";
import FilterableList from "./filterable-list";
import TextInputField from "../common/TextInputField";

function SyncedInputs(): JSX.Element {
    const [text, setText] = useState<string>('');
    const handleChange: TextInputChangeEventHandler = e => setText(e.target.value);
    return (
        <div className="space-y-2">
            <h2 className="text-xl font-semibold">Synced Inputs</h2>
            <TextInputField label="First input" labelWidth="w-36" textInputProps={{ value: text, onChange: handleChange }} />
            <TextInputField label="Second input" labelWidth="w-36" textInputProps={{ value: text, onChange: handleChange }} />
        </div>
    );
}

export default function SharingState(): JSX.Element {
    return (
        <section className="border border-black rounded-xl p-5 space-y-4 w-[512px]">
            <h1 className="text-2xl font-bold">Sharing State Between Components</h1>
            <FilterableList />
            <SyncedInputs />
        </section>
    );
}
