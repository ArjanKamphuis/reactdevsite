import { ChangeEventHandler } from "react";

type TextAreaChangeEventHandler = ChangeEventHandler<HTMLTextAreaElement>;

type TextAreaProps = {
    value: string;
    placeholder?: string;
    onChange?: TextAreaChangeEventHandler;
    height?: string;
};

export default function TextArea({ value, placeholder, onChange, height }: TextAreaProps): JSX.Element {
    const classNames = `block border border-black rounded px-2 py-1 w-full${height !== undefined ? ` ${height}` : ''}`;
    return <textarea className={classNames} placeholder={placeholder} value={value} onChange={onChange} />;
}
