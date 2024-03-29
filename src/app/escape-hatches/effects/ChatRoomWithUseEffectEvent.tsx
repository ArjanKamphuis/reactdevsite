import { NotificationTheme, showNotification } from "@/app/common/utils";
import { useEffectEvent } from "./useEffectEvent";
import { useEffect, useState } from "react";
import { SelectField } from "@/app/common/SelectField";
import CheckboxField from "@/app/common/CheckboxField";

type ConnectionEvent = 'connected';
type Room = 'general' | 'travel' | 'music';

type ConnectionType = {
    connect: () => void;
    disconnect: () => void;
    on: (event: ConnectionEvent, callback: Function) => void;
};

type ChatRoomProps = {
    room: Room;
    theme: NotificationTheme;
};

const rooms: Room[] = ['general', 'travel', 'music'];
const serverUrl: string = 'https://localhost:1234';

function createConnection(_serverUrl: string, _room: Room): ConnectionType {
    let connectedCallback: Function;
    let timeout: NodeJS.Timeout;

    return {
        connect() {
            timeout = setTimeout(() => {
                connectedCallback?.call(null);
            }, 100);
        },
        on(_event, callback) {
            if (connectedCallback) {
                throw Error('Cannot add the handler twice.');
            }
            connectedCallback = callback;
        },
        disconnect() {
            clearTimeout(timeout);
        }
    };
}

function ChatRoom({ room, theme }: ChatRoomProps): React.JSX.Element {
    const onConnected: (room: Room) => void = useEffectEvent(room => {
        //showNotification(`Welcome to ${room}`, theme);
    });

    useEffect(() => {
        const connection: ConnectionType = createConnection(serverUrl, room);
        let timeout: NodeJS.Timeout;
        connection.on('connected', () => {
            timeout = setTimeout(() => {
                onConnected(room);
            }, 2000);
        });
        connection.connect();
        return (): void => {
            if (timeout) clearTimeout(timeout);
            connection.disconnect();
        }
    }, [room, onConnected]);

    return <h2 className="text-xl font-semibold">Welcome to the {room} room!</h2>;
}

export default function ChatRoomApp(): React.JSX.Element {
    const [room, setRoom] = useState<Room>(rooms[0]);
    const [isDark, setIsDark] = useState<boolean>(false);

    const roomOptions: React.JSX.Element[] = rooms.map(r => <option key={r} value={r}>{r}</option>);

    return (
        <div className="space-y-2">
            <SelectField label="Choose the chat room:" selectProps={{ value: room, onChange: e => setRoom(e.target.value as Room), children: roomOptions}} />
            <CheckboxField checked={isDark} onChange={e => setIsDark(e.target.checked)}>Use dark theme</CheckboxField>
            <hr className="border-black" />
            <ChatRoom room={room} theme={isDark ? 'dark' : 'light'} />
        </div>
    );
}
