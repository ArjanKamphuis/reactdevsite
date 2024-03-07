import CheckboxField from "@/app/common/CheckboxField";
import Button from "@/app/common/button";
import { TextInputChangeEventHandler, TextInputWithRef } from "@/app/common/textInput";
import { MutableRefObject, useEffect, useRef, useState } from "react";

type MyInputProps = {
    value: string;
    onChange: TextInputChangeEventHandler;
    shouldFocus?: boolean;
};

type MyInputFieldProps = {
    label: string;
    inputProps: MyInputProps;
};

function MyInput({ value, onChange, shouldFocus }: MyInputProps): React.JSX.Element {
    const inputRef: MutableRefObject<HTMLInputElement | null> = useRef<HTMLInputElement>(null);
    useEffect(() => {
        if (shouldFocus) {
            inputRef.current?.focus();
        }
    }, [shouldFocus]);
    return <TextInputWithRef ref={inputRef} value={value} onChange={onChange} />
}

function MyInputField({ label, inputProps }: MyInputFieldProps): React.JSX.Element {
    return (
        <label className="flex items-center">
            <span className="w-72">{label}</span>
            <MyInput {...inputProps} />
        </label>
    );
}

export default function MyInputForm(): React.JSX.Element {
    const [show, setShow] = useState<boolean>(false);
    const [firstName, setFirstName] = useState<string>('Taylor');
    const [lastName, setLastName] = useState<string>('Swift');
    const [upper, setUpper] = useState<boolean>(false);
    const name: string = upper ? `${firstName} ${lastName}`.toUpperCase() : `${firstName} ${lastName}`

    const form: React.JSX.Element = (
        <form className="space-y-2">
            <MyInputField label="Enter your first name:" inputProps={{ value: firstName, onChange: e => setFirstName(e.target.value), shouldFocus: true }} />
            <MyInputField label="Enter your last name:" inputProps={{ value: lastName, onChange: e => setLastName(e.target.value) }} />
            <CheckboxField checked={upper} onChange={e => setUpper(e.target.checked)}>Make it uppercase</CheckboxField>
            <p>Hello, <b>{name}</b></p>
        </form>
    );

    return (
        <div className="space-y-2">
            <Button onClick={() => setShow(!show)}>{show ? 'Hide' : 'Show'} form</Button>
            <hr className="border-black" />
            {show && form}
        </div>
    );
}