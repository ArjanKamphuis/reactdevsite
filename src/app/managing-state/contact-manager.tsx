import { useState } from "react";
import Button from "../common/button";
import TextInputField from "../common/TextInputField";

type Contact = {
    id: number;
    name: string;
    email: string;
};

type SaveHandler = (updatedData: Contact) => void;

type ContactListProps = {
    contacts: Contact[];
    selectedId: number;
    onSelect: (id: number) => void;
};
type EditContactProps = {
    initialData: Contact;
    onSave: SaveHandler;
};

const initialContacts: Contact[] = [
    { id: 0, name: 'Taylor', email: 'taylor@mail.com' },
    { id: 1, name: 'Alice', email: 'alice@mail.com' },
    { id: 2, name: 'Bob', email: 'bob@mail.com' }
];

function ContactList({ contacts, selectedId, onSelect }: ContactListProps): JSX.Element {
    return (
        <ul className="flex space-x-2">
            {contacts.map(contact => {
                const liClasses: string = `border-4 rounded-xl ${contact.id === selectedId ? 'border-blue-500 bg-blue-500' : 'border-transparent'}`;
                return <li key={contact.id} className={liClasses}>
                    <Button onClick={() => onSelect(contact.id)}>{contact.name}</Button>
                </li>
            })}
        </ul>
    );
}

function EditContact({ initialData, onSave }: EditContactProps): JSX.Element {
    const [name, setName] = useState<string>(initialData.name);
    const [email, setEmail] = useState<string>(initialData.email);
    return (
        <div className="space-y-2">
            <TextInputField label="Name:" textInputProps={{ value: name, onChange: e => setName(e.target.value) }} />
            <TextInputField label="Email:" textInputProps={{ value: email, onChange: e=> setEmail(e.target.value) }} />
            <div className="space-x-2">
                <Button onClick={() => onSave({ id: initialData.id, name: name, email: email })}>Save</Button>
                <Button onClick={() => { setName(initialData.name); setEmail(initialData.email) }}>Reset</Button>
            </div>
        </div>
    );
}

export default function ContactManager(): JSX.Element {
    const [contacts, setContacts] = useState<Contact[]>(initialContacts);
    const [selectedId, setSelectedId] = useState<number>(0);
    const selectedContact: Contact = contacts.find(c => c.id === selectedId) ?? contacts[0];

    const handleSave: SaveHandler = updatedData => setContacts(contacts.map(c => c.id === updatedData.id ? updatedData : c));

    return (
        <div className="space-y-2">
            <h2 className="text-xl font-semibold">Contact List</h2>
            <ContactList contacts={contacts} selectedId={selectedId} onSelect={id => setSelectedId(id)} />
            <hr className="border-black" />
            <EditContact key={selectedId} initialData={selectedContact} onSave={handleSave} />
        </div>
    );
}
