import { MouseEventHandler } from "react";

export type ButtonClickEventHandler = MouseEventHandler<HTMLButtonElement>;

type ButtonProps = {
    children: React.ReactNode;
    onClick?: ButtonClickEventHandler;
    disabled?: boolean;
    type?: "button" | "submit" | "reset";
    isHighlighted?: boolean;
    width?: string;
};

export default function Button({ children, onClick, disabled, type, isHighlighted, width }: ButtonProps): JSX.Element {
    let className: string = 'px-2 py-1 rounded-xl text-white disabled:opacity-50';
    if (width) className += ` ${width}`;
    className += isHighlighted ? ' bg-blue-500 hover:bg-blue-600 active:bg-blue-700' : ' bg-gray-900 hover:bg-gray-700 active:bg-gray-600';

    return <button type={type} disabled={disabled} className={className} onClick={onClick}>{children}</button>
}
