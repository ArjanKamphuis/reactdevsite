import { ChangeEventHandler } from "react";

export type RangeInputChangeEventHandler = ChangeEventHandler<HTMLInputElement>;

export type RangeInputProps = {
    value?: string | number | readonly string[];
    min?: number;
    max?: number;
    onChange?: RangeInputChangeEventHandler
};

export type RangeInputFieldProps = {
    label: string;
    inputProps: RangeInputProps;
};

export default function RangeInputField({ label, inputProps }: RangeInputFieldProps): React.JSX.Element {
    return (
        <label>
            <span className="block">{label}</span>
            <div className="flex justify-center">
                <input type="range" {...inputProps} />
            </div>
        </label>
    );
}