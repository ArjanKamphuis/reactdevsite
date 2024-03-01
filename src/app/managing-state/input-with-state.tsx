import Image from "next/image";
import { useState } from "react";
import TextInput, { TextInputChangeEventHandler } from "../common/textInput";
import Button from "../common/button";

type FormFieldProps = {
    isEditing: boolean;
    text: string;
    value: string;
    id: string;
    onChangeHandler: TextInputChangeEventHandler;
};

type Person = {
    firstName: string;
    lastName: string;
};
const personToString = (person: Person) => `${person.firstName} ${person.lastName}`;

function Picture(): JSX.Element {
    const [isActive, setIsActive] = useState<boolean>(false);
    const divClasses: string = `w-96 h-96 flex justify-center items-center ${!isActive && 'bg-[#a6b5ff]'}`;
    const imgClasses: string = `border-4 rounded-lg ${isActive ? 'border-[#a6b5ff]' : 'border-transparent'}`;
    return (
        <div className={divClasses} onClick={() => setIsActive(false)}>
            <Image className={imgClasses}
                   width={192} height={192} priority
                   src="https://i.imgur.com/5qwVYb1.jpeg"
                   alt="Rainbow houses in Kampung Pelangi, Indonesia"
                   onClick={e => { e.stopPropagation(); setIsActive(true); }}
            />
        </div>
    );
}

function RenderFormField({ isEditing, text, value, id, onChangeHandler }: FormFieldProps): JSX.Element {
    return (
        <div className="flex items-center">{
            isEditing
            ? (<><label className="w-24 flex-none" htmlFor={id}>{text}</label><TextInput id={id} value={value} onChange={onChangeHandler} /></>)
            : (<><span className="w-24">{text}</span><b>{value}</b></>)}
        </div>
    );
}

function EditProfile(): JSX.Element {
    const [person, setPerson] = useState<Person>({ firstName: 'Jane', lastName: 'Jacobs' });
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const handleInputChange: TextInputChangeEventHandler = e => setPerson({ ...person, [e.target.id]: e.target.value });

    return (
        <form className="w-96 space-y-2" onSubmit={e => { e.preventDefault(); setIsEditing(!isEditing); }}>
            <RenderFormField isEditing={isEditing} text="First name:" value={person.firstName} id="firstName" onChangeHandler={handleInputChange} />
            <RenderFormField isEditing={isEditing} text="Last name:" value={person.lastName} id="lastName" onChangeHandler={handleInputChange} />
            <Button type="submit">{isEditing ? 'Save' : 'Edit'} Profile</Button>
            <p><i>Hello, {personToString(person)}</i></p>
        </form>
    );
}

export default function InputWithState(): JSX.Element {
    return (
        <section className="border border-black rounded-xl p-5 space-y-2 w-fit">
            <h1 className="text-2xl font-bold">Reacting to Input with State</h1>
            <Picture />
            <EditProfile />
            <a className="block hover:underline text-blue-500" href="./without-react/index.html">Edit profile without React</a>
        </section>
    );
}
