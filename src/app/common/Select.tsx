import { ChangeEventHandler } from "react";

export type SelectChangeEventHandler = ChangeEventHandler<HTMLSelectElement>;

export type SelectProps = {
    value? : string | number | string[];
    onChange?: SelectChangeEventHandler;
    children?: React.ReactNode;
    width?: string;
};

export const Select = ({ value, onChange, children, width }: SelectProps): React.JSX.Element => {
    let className: string = 'px-2 py-1 border border-black rounded';
    if (width) className += ` ${width}`;
    return <select className={className} value={value} onChange={onChange}>{children}</select>
};
