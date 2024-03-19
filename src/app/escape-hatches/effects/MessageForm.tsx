import Button from "@/app/common/button";
import TextArea from "@/app/common/textarea";
import { FormEvent, useState } from "react";

const sendMessage = (message: string): void => {
    console.log(`Sending message: ${message}`);
};

export const MessageForm = (): React.JSX.Element => {
    const [showForm, setShowForm] = useState<boolean>(false);
    const [message, setMessage] = useState<string>('');

    const handleSubmit = (e: FormEvent): void => {
        e.preventDefault();
        setShowForm(false);
        sendMessage(message);
    };

    if (!showForm) {
        return (
            <div className="space-y-2">
                <h2 className="text-xl font-semibold">Thanks for using our services</h2>
                <Button onClick={() => { setMessage(''); setShowForm(true); }}>Open chat</Button>
            </div>
        );
    }

    return (
        <form className="space-y-2" onSubmit={handleSubmit}>
            <TextArea placeholder="Message..." value={message} onChange={e => setMessage(e.target.value)} />
            <Button type="submit" disabled={message === ''}>Send</Button>
        </form>
    );
};


