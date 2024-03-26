import { Select, SelectProps } from "./Select";

export type SelectFieldProps = {
    label?: string;
    selectProps?: SelectProps;
};

export const SelectField = ({ label, selectProps }: SelectFieldProps): React.JSX.Element => {
    return (
        <label className="flex items-center space-x-2">
            <span>{label}</span>
            <Select {...selectProps} />
        </label>
    )
};
