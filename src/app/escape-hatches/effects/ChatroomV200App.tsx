import { showNotification } from "@/app/common/utils";
import { useEffectEvent } from "./useEffectEvent";
import { useEffect, useState } from "react";
import { SelectField } from "@/app/common/SelectField";
import CheckboxField from "@/app/common/CheckboxField";

type ConnectionEvent = 'message';
type Room = 'general' | 'travel' | 'music';
type MessageHandler = (msg: string) => void;

type ConnectionType = {
    connect: () => void;
    disconnect: () => void;
    on: (event: ConnectionEvent, callback: CallableFunction) => void;
};

type ConnectionOptions = {
    serverUrl: string;
    room: Room;
    isEncrypted: boolean;
    isEnabled: boolean;
};

type ChatRoomProps = {
    room: Room;
    isEncrypted: boolean;
    isEnabled: boolean;
    onMessage: MessageHandler;
};

const rooms: Room[] = ['general', 'travel', 'music'];
const serverUrl: string = 'https://localhost:1234';

function createConnection({ serverUrl, room , isEncrypted, isEnabled }: ConnectionOptions): ConnectionType {
    let intervalId: NodeJS.Timeout | null = null;
    let messageCallback: MessageHandler | null = null;
    return {
        connect(): void {
            console.log(`✅ Connecting to "${room}" at ${serverUrl} (${isEncrypted ? 'encrypted' : 'unencrypted'})`);
            if (intervalId) clearInterval(intervalId);
            if (!isEnabled) return;
            intervalId = setInterval(() => {
                if (messageCallback !== null) {
                    messageCallback(Math.random() > 0.5 ? 'hey' : 'lol');
                }
            }, 3000);
        },
        disconnect(): void {
            if (intervalId) clearInterval(intervalId);
            messageCallback = null;
            console.log(`❌ Disconnected from "${room}" at ${serverUrl} (${isEncrypted ? 'encrypted' : 'unencrypted'})`);
        },
        on(_event, callback): void {
            if (messageCallback !== null) throw Error('Cannot add the handler twice.');
            messageCallback = callback as MessageHandler;
        }
    };
}

function ChatRoom({ room, isEncrypted, isEnabled, onMessage }: ChatRoomProps): React.JSX.Element {
    const onReceiveMessage: MessageHandler = useEffectEvent(onMessage);

    useEffect(() => {
        const connection: ConnectionType = createConnection({ serverUrl, room, isEncrypted, isEnabled });
        connection.on('message', onReceiveMessage);
        connection.connect();
        return (): void => { connection.disconnect(); };
    }, [room, isEncrypted, isEnabled, onReceiveMessage]);

    return <h2 className="text-xl font-semibold">Welcome to the {room} room!</h2>;
}

export default function ChatRoomV200App(): React.JSX.Element {
    const [room, setRoom] = useState<Room>(rooms[0]);
    const [isDark, setIsDark] = useState<boolean>(false);
    const [isEncrypted, setIsEncrypted] = useState<boolean>(false);
    const [isEnabled, setIsEnabled] = useState<boolean>(false);

    const roomOptions: React.JSX.Element[] = rooms.map(r => <option key={r} value={r}>{r}</option>);

    return (
        <div className="space-y-2">
            <CheckboxField checked={isEnabled} onChange={e => setIsEnabled(e.target.checked)}>Message pump</CheckboxField>
            <CheckboxField checked={isDark} onChange={e => setIsDark(e.target.checked)}>Use dark theme</CheckboxField>
            <CheckboxField checked={isEncrypted} onChange={e => setIsEncrypted(e.target.checked)}>Enable encryption</CheckboxField>
            <SelectField label="Choose the chat room:" selectProps={{ value: room, onChange: e => setRoom(e.target.value as Room), children: roomOptions}} />
            <hr className="border-black" />
            <ChatRoom room={room} isEncrypted={isEncrypted} isEnabled={isEnabled} onMessage={msg => showNotification(`New message: ${msg}`, isDark ? 'dark' : 'light')} />
        </div>
    );
}
