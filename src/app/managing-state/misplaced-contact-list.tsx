import { useState } from "react";
import Button from "../common/button";
import CheckboxField from "../common/CheckboxField";

type Contact = {
    id: number;
    name: string;
    email: string;
};

function Contact({ contact }: { contact: Contact }): JSX.Element {
    const [expanded, setExpanded] = useState<boolean>(false);
    return (
        <div className="flex items-center justify-between">
            <div className="flex">
                <p className="w-24"><b>{contact.name}</b></p>
                {expanded && <p className="w-24"><i>{contact.email}</i></p>}
            </div>
            <div>
                <Button onClick={() => setExpanded(!expanded)}>{expanded ? 'Hide' : 'Show'} email</Button>
            </div>
        </div>
    );
}

export default function MisplacedContactList(): JSX.Element {
    const [reverse, setReverse] = useState<boolean>(false);
    const displayedContacts: Contact[] = reverse ? [...contacts].reverse() : contacts;
    return (
        <div className="space-y-2">
            <CheckboxField checked={reverse} onChange={e => setReverse(e.target.checked)}>Show in reverse order</CheckboxField>
            <ul className="space-y-2">
                {displayedContacts.map(contact => <li key={contact.id}><Contact contact={contact} /></li>)}
            </ul>
        </div>
    );
}

const contacts: Contact[] = [
    { id: 0, name: 'Taylor', email: 'taylor@mail.com' },
    { id: 1, name: 'Alice', email: 'alice@mail.com' },
    { id: 2, name: 'Bob', email: 'bob@mail.com' }
];
