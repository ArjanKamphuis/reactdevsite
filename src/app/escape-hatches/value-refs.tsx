import { MutableRefObject, useRef, useState } from "react";
import TextInput from "../common/textInput";
import Button from "../common/button";

function Chat(): React.JSX.Element {
    const [text, setText] = useState('');
    const [isSending, setIsSending] = useState(false);
    const timeoutRef: MutableRefObject<NodeJS.Timeout | null> = useRef(null);

    function handleSend() {
        setIsSending(true);
        timeoutRef.current = setTimeout(() => {
            console.log(`Sent: ${text}!`);
            setIsSending(false);
        }, 3000);
    }

    function handleUndo() {
        setIsSending(false);
        if (timeoutRef.current !== null) clearTimeout(timeoutRef.current);
    }

    return (
        <div className="flex space-x-2">
            <TextInput disabled={isSending} value={text} onChange={e => setText(e.target.value)} />
            <Button disabled={isSending} onClick={handleSend}>{isSending ? 'Sending...' : 'Send'}</Button>
            {isSending && <Button onClick={handleUndo}>Undo</Button>}
        </div>
    )
}

function Toggle(): React.JSX.Element {
    const [isOn, setIsOn] = useState(false);
    return <Button onClick={() => setIsOn(!isOn)}>{isOn ? 'On' : 'Off'}</Button>
}

type DebouncedButtonProps = {
    onClick: () => void;
    children: React.ReactNode;
}

function DebouncedButton({ onClick, children }: DebouncedButtonProps): React.JSX.Element {
    const timeOutRef: MutableRefObject<NodeJS.Timeout | null> = useRef(null);
    return <Button onClick={() => {
        if (timeOutRef.current) clearTimeout(timeOutRef.current);
        timeOutRef.current = setTimeout(() => onClick(), 1000)
    }}>{children}</Button>
}

function Dashboard(): React.JSX.Element {
    return (
        <div className="flex space-x-2">
            <DebouncedButton onClick={() => console.log('Spaceship launched!')}>Launch the spaceship</DebouncedButton>
            <DebouncedButton onClick={() => console.log('Soup boiled!')}>Boil the soup</DebouncedButton>
            <DebouncedButton onClick={() => console.log('Lullaby sung!')}>Sing a lullaby</DebouncedButton>
        </div>
    )
}

function RefChat(): React.JSX.Element {
    const [text, setText] = useState('');
    const textRef: MutableRefObject<string> = useRef(text);
    
    function handleSend(): void {
        setTimeout(() => console.log(`Sending: ${textRef.current}`), 3000);
    }

    return (
        <div className="flex space-x-2">
            <TextInput value={text} onChange={e => { setText(e.target.value); textRef.current = e.target.value; } } />
            <Button onClick={handleSend}>Send</Button>
        </div>
    );
}

export default function ValueRefs(): React.JSX.Element {
    return (
        <section className="border border-black rounded-xl p-5 space-y-4 w-fit">
            <h1 className="text-2xl font-bold">Referencing Values with Refs</h1>
            <RefChat />
            <Dashboard />
            <Toggle />
            <Chat />
        </section>
    );
}
