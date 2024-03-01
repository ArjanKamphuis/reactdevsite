import { useState } from "react";
import Button from "../common/button";
import TextArea from "../common/textarea";
import ContactManager from "./contact-manager";
import TextInputField from "../common/TextInputField";
import Gallery from "./gallery";
import MisplacedContactList from "./misplaced-contact-list";

function Form(): JSX.Element {
    const [text, setText] = useState<string>('');
    return <TextArea value={text} onChange={e => setText(e.target.value)} />;
}

function FormApp(): JSX.Element {
    const [showHint, setShowHint] = useState<boolean>(false);
    return (
        <div className="space-y-2">
            {showHint && <p><i>Hint: Your favorite city?</i></p>}
            <Form />
            {showHint ? <Button onClick={() => setShowHint(false)}>Hide hint</Button> : <Button onClick={() => setShowHint(true)}>Show hint</Button>}
        </div>
    );
}

function Field({ label }: { label: string }): JSX.Element {
    const [text, setText] = useState<string>('');
    return <TextInputField label={label} labelWidth="w-32" textInputProps={{ value: text, placeholder: label, onChange: e => setText(e.target.value) }} />;
}

function FieldApp(): JSX.Element {
    const [reverse, setReverse] = useState<boolean>(false);
    const checkBox: JSX.Element = (
        <label className="block">
            <input className="mr-1" type="checkbox" checked={reverse} onChange={e => setReverse(e.target.checked)} />
            Reverse order
        </label>
    );
    const fields: JSX.Element[] = [<Field key="firstName" label="First name" />, <Field key="lastName" label="Last name" />];
    return (
        <div className="space-y-2">
            {reverse ? fields.reverse() : fields}
            {checkBox}
        </div>
    );
}

export default function PreservingAndResettingState(): JSX.Element {
    return (
        <section className="border border-black rounded-xl p-5 space-y-4 w-fit">
            <h1 className="text-2xl font-bold">Preserving and Resetting State</h1>
            <MisplacedContactList />
            <Gallery />
            <ContactManager />
            <FieldApp />
            <FormApp />
        </section>
    );
}
