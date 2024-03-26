import { SelectField } from "@/app/common/SelectField";
import TextInputField from "@/app/common/TextInputField";
import Button from "@/app/common/button";
import { useEffect, useMemo, useState } from "react";

type Room = 'general' | 'travel' | 'music';
const rooms: Room[] = ['general', 'travel', 'music'];
const roomOptions: React.JSX.Element[] = rooms.map(r => <option key={r} value={r}>{r}</option>);

type ConnectionType = {
    connect: () => void;
    disconnect: () => void;
};

type ConnectionOptions = {
    serverUrl: string;
    room: Room;
}

function createConnection({ serverUrl, room }: ConnectionOptions): ConnectionType {
    return {
        connect() {
            console.log(`✅ Connecting to "${room}" at ${serverUrl} (encrypted)`);
        },
        disconnect() {
            console.log(`❌ Disconnected from "${room}" at ${serverUrl} (encrypted)`);
        }
    }
};

function ChatRoom({ serverUrl, room }: ConnectionOptions): React.JSX.Element {
    useEffect(() => {
        const connection: ConnectionType = createConnection({ serverUrl, room });
        connection.connect();
        return (): void => { connection.disconnect(); };
    }, [serverUrl, room]);

    return <h2 className="text-xl font-semibold">Welcome to the {room} room!</h2>;
}

export default function ChatRoomApp(): React.JSX.Element {
    const [isDark, setIsDark] = useState<boolean>(false);
    const [room, setRoom] = useState<Room>('general');
    const [serverUrl, setServerUrl] = useState<string>('https://localhost:1234');

    const divClasses = useMemo<string>(() => {
        let classes = isDark ? 'bg-blue-500 text-green-500' : 'bg-green-500 text-blue-500';
        classes += ' space-y-2 p-5 rounded-xl';
        return classes;
    }, [isDark]);

    return (
        <div className={divClasses}>
            <Button onClick={() => setIsDark(d => !d)}>Toggle theme</Button>
            <TextInputField label="Server URL:" labelWidth="w-32" textInputProps={{ value: serverUrl, onChange: e => setServerUrl(e.target.value) }} />
            <SelectField label="Choose the chat room:" selectProps={{ value: room, onChange: e => setRoom(e.target.value as Room), children: roomOptions }} />
            <hr className={isDark ? 'border-green-500' : 'border-blue-500'} />
            <ChatRoom serverUrl={serverUrl} room={room} />
        </div>
    );
}
