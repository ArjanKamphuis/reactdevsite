import TextInputField from "@/app/common/TextInputField";
import Button from "@/app/common/button";
import { useState } from "react";

type Contact = {
    id: number;
    name: string;
    email: string;
};

type ContactListProps = {
    contacts: Contact[];
    selectedId: number;
    onSelect: (id: number) => void;
};

type EditContactProps = {
    savedContact: Contact;
    onSave: (updatedData: Contact) => void;
};

const initialContacts: Contact[] = [
    { id: 0, name: 'Taylor', email: 'taylor@mail.com' },
    { id: 1, name: 'Alice', email: 'alice@mail.com' },
    { id: 2, name: 'Bob', email: 'bob@mail.com' }
];

const ContactList = ({ contacts, selectedId, onSelect }: ContactListProps): React.JSX.Element => {
    const listItems: React.JSX.Element[] = contacts.map(contact => (
        <li key={contact.id}>
            <Button onClick={() => onSelect(contact.id)} isHighlighted={contact.id === selectedId}>{contact.name}</Button>
        </li>
    ));
    return <ul className="flex space-x-2">{listItems}</ul>;
};

const EditContact = ({ savedContact, onSave }: EditContactProps): React.JSX.Element => {
    const [name, setName] = useState<string>(savedContact.name);
    const [email, setEmail] = useState<string>(savedContact.email);

    return (
        <div className="space-y-2">
            <TextInputField label="Name" textInputProps={{ value: name, onChange: e => setName(e.target.value)}} />
            <TextInputField label="Email" textInputProps={{ value: email, onChange: e => setEmail(e.target.value)}} />
            <div className="flex space-x-2">
                <Button onClick={() => onSave({ id: savedContact.id, name: name, email: email } as Contact)}>Save</Button>
                <Button onClick={() => { setName(savedContact.name); setEmail(savedContact.email); }}>Reset</Button>
            </div>
        </div>
    );
};

export const ContactManager = (): React.JSX.Element => {
    const [contacts, setContacts] = useState<Contact[]>(initialContacts);
    const [selectedId, setSelectedId] = useState<number>(0);

    const selectedContact: Contact = contacts.find(c => c.id === selectedId)!;

    const handleSave = (updatedData: Contact): void => {
        setContacts(contacts.map(c => c.id === updatedData.id ? updatedData : c));
    };

    return (
        <div className="space-y-2">
            <ContactList contacts={contacts} selectedId={selectedId} onSelect={id => setSelectedId(id)} />
            <hr className="border-black" />
            <EditContact key={selectedContact.id} savedContact={selectedContact} onSave={handleSave} />
        </div>
    );
};
