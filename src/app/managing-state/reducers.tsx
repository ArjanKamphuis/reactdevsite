import Button from "../common/button";
import TextArea from "../common/textarea";
import useReducer, { IReducerAction, ReducerDispatchHandler, ReducerType } from "./use-reducer";

type Contact = {
    id: number;
    name: string;
    email: string;
};

type State = {
    selectedId: number;
    messages: { [id: number]: string };
};

interface Action extends IReducerAction {
    type: 'changed_selection' | 'edited_message';
    selectedId: number;
    message: string;
};

type ContactListProps = {
    contacts: Contact[],
    selectedId: number;
    dispatch: ReducerDispatchHandler<Action>;
};

type ChatProps = {
    contact: Contact;
    message: string;
    dispatch: ReducerDispatchHandler<Action>;
};

function ContactList({ contacts, selectedId, dispatch }: ContactListProps): JSX.Element {
    return (
        <ul className="space-y-2 w-1/3">
            {contacts.map(contact =>
                <li key={contact.id}>
                    <Button width="w-full" isHighlighted={contact.id === selectedId} onClick={() => dispatch({ type: 'changed_selection', selectedId: contact.id, message: '' })}>{contact.name}</Button>
                </li>
            )}
        </ul>
    );
}

function Chat({ contact, message, dispatch }: ChatProps): JSX.Element {
    function handleButtonClick(): void {
        console.log(`Sending ${message} to ${contact.email}`);
        dispatch({ type: 'edited_message', message: '', selectedId: contact.id });
    }
    return (
        <div className="space-y-2 w-2/3">
            <TextArea value={message} placeholder={`Chat to ${contact.name}...`} height="h-40" onChange={e => dispatch({ type: 'edited_message', selectedId: contact.id, message: e.target.value })} />
            <Button onClick={handleButtonClick} width="w-full">Send to {contact.email}</Button>
        </div>
    );
}

export default function Reducers(): JSX.Element {
    const [state, dispatch] = useReducer<State, Action>(messengerReducer, initialState);
    const contact: Contact = contacts.find(c => c.id === state.selectedId) ?? contacts[0];
    const message: string = state.messages ? state.messages[contact.id] : '';
    return (
        <section className="border border-black rounded-xl p-5 space-y-4 w-fit">
            <h1 className="text-2xl font-bold">Extracting State Logic into a Reducer</h1>
            <div className="flex space-x-2">
                <ContactList contacts={contacts} selectedId={state.selectedId} dispatch={dispatch} />
                <Chat key={contact.id} contact={contact} message={message} dispatch={dispatch} />
            </div>
        </section>
    );
}

const messengerReducer: ReducerType<State, Action> = (state, action) => {
    switch (action.type) {
        case 'changed_selection': return { ...state, selectedId: action.selectedId };
        case 'edited_message':    return { ...state, messages: { ...state.messages, [action.selectedId.toString()]: action.message  } };
    }
}

const initialState: State = {
    selectedId: 0,
    messages: {}
};

const contacts: Contact[] = [
    { id: 0, name: 'Taylor', email: 'taylor@mail.com' },
    { id: 1, name: 'Alice', email: 'alice@mail.com' },
    { id: 2, name: 'Bob', email: 'bob@mail.com' }
];
