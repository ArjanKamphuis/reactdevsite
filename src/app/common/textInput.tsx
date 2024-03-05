import { ChangeEventHandler } from "react";

export type TextInputChangeEventHandler = ChangeEventHandler<HTMLInputElement>;

export type TextInputProps = {
    value: string;
    type?: 'email' | 'number' | 'password' | 'search' | 'tel' | 'text' | 'url';
    onChange?: TextInputChangeEventHandler;
    placeholder?: string;
    id?: string;
    name?: string;
    disabled?: boolean;
};

export default function TextInput({ value, onChange, placeholder, id, name, disabled, type = 'text' }: TextInputProps): JSX.Element {
    const className: string = 'px-2 py-1 border border-black rounded w-full';
    return <input type={type} className={className} value={value} onChange={onChange} placeholder={placeholder} id={id} name={name} disabled={disabled} />;
}
