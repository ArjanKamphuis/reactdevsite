import { ChangeEventHandler } from "react";

type TextAreaChangeEventHandler = ChangeEventHandler<HTMLTextAreaElement>;

type TextAreaProps = {
    value: string;
    placeholder?: string;
    onChange?: TextAreaChangeEventHandler;
};

export default function TextArea({ value, placeholder, onChange }: TextAreaProps): JSX.Element {
    const classNames = 'block border border-black rounded px-2 py-1 w-full';
    return <textarea className={classNames} placeholder={placeholder} value={value} onChange={onChange} />;
}
