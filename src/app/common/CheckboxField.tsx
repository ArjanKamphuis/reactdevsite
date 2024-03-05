import { ChangeEventHandler } from "react";

type CheckboxChangeEventHandler = ChangeEventHandler<HTMLInputElement>;

type CheckboxFieldProps = {
    children?: React.ReactNode;
    checked?: boolean;
    onChange?: CheckboxChangeEventHandler;
};

export default function CheckboxField({ children, checked, onChange }: CheckboxFieldProps): JSX.Element {
    return (
        <label className="block">
            <input type="checkbox" checked={checked} onChange={onChange} />
            &nbsp;{children}
        </label>
    );
}
