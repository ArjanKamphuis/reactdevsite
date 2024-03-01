import TextInput, { TextInputProps } from "./textInput";

type TextInputFieldProps = {
    label: string;
    textInputProps: TextInputProps;
    labelWidth?: string;
};

export default function TextInputField({ label, textInputProps, labelWidth = 'w-24' }: TextInputFieldProps): JSX.Element {
    const { value, onChange, placeholder, id, name } = textInputProps;
    return (
        <label className="flex items-center">
            <span className={labelWidth}>{label}</span>
            <TextInput value={value} onChange={onChange} placeholder={placeholder} id={id} name={name} />
        </label>
    );
}
