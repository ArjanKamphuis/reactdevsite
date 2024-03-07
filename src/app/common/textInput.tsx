import { ChangeEventHandler, ForwardRefExoticComponent, ForwardedRef, RefAttributes, forwardRef } from "react";

export type TextInputChangeEventHandler = ChangeEventHandler<HTMLInputElement>;

export type TextInputProps = {
    value?: string;
    type?: 'email' | 'number' | 'password' | 'search' | 'tel' | 'text' | 'url';
    onChange?: TextInputChangeEventHandler;
    placeholder?: string;
    id?: string;
    name?: string;
    disabled?: boolean;
};

export default function TextInput({ value, onChange, placeholder, id, name, disabled, type }: TextInputProps): JSX.Element {
    const className: string = 'px-2 py-1 border border-black rounded w-full';
    return <input type={type} className={className} value={value} onChange={onChange} placeholder={placeholder} id={id} name={name} disabled={disabled} />;
}

function TextInputWithRefComponent(props: TextInputProps, ref: ForwardedRef<HTMLInputElement>): React.JSX.Element {
    return <input ref={ref} {...props} className="px-2 py-1 border border-black rounded w-full" />;
}
export const TextInputWithRef: ForwardRefExoticComponent<TextInputProps & RefAttributes<HTMLInputElement>> = forwardRef(TextInputWithRefComponent);

// export const TextInputWithRef: ForwardRefExoticComponent<TextInputProps & RefAttributes<HTMLInputElement>> =
//     forwardRef<HTMLInputElement, TextInputProps>(function TextInputWithRef(props: TextInputProps, ref: ForwardedRef<HTMLInputElement>) { 
//         return <input ref={ref} {...props} className="px-2 py-1 border border-black rounded w-full" />;
//     });
