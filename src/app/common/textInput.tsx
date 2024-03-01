import { ChangeEventHandler } from "react";

export type TextInputChangeEventHandler = ChangeEventHandler<HTMLInputElement>;

export type TextInputProps = {
    value: string;
    onChange?: TextInputChangeEventHandler;
    placeholder?: string;
    id?: string;
    name?: string;
};

export default function TextInput({ value, onChange, placeholder, id, name }: TextInputProps): JSX.Element {
    const className: string = 'px-2 py-1 border border-black rounded w-full';
    return <input className={className} value={value} onChange={onChange} placeholder={placeholder} id={id} name={name} />;
}
