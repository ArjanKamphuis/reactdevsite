import { MouseEventHandler } from "react";

type ButtonProps = {
    children: React.ReactNode;
    onClick?: MouseEventHandler<HTMLButtonElement>;
}

export default function Button({ children, onClick }: ButtonProps): JSX.Element {
    const className: string = 'px-2 py-1 rounded-xl bg-gray-900 hover:bg-gray-700 text-white';
    return <button className={className} onClick={onClick}>{children}</button>
}
