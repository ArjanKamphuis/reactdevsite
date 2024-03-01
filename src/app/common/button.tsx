import { MouseEventHandler } from "react";

export type ButtonClickEventHandler = MouseEventHandler<HTMLButtonElement>;

type ButtonProps = {
    children: React.ReactNode;
    onClick?: ButtonClickEventHandler;
    disabled?: boolean;
    type?: "button" | "submit" | "reset";
};

export default function Button({ children, onClick, disabled, type }: ButtonProps): JSX.Element {
    const className: string = 'px-2 py-1 rounded-xl bg-gray-900 hover:bg-gray-700 active:bg-gray-600 text-white disabled:opacity-50';
    return <button type={type} disabled={disabled} className={className} onClick={onClick}>{children}</button>
}
