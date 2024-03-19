import { Select } from "@/app/common/Select";
import TextInput from "@/app/common/textInput";
import { useEffect, useState } from "react";

type ConnectionType = {
    connect: () => void;
    disconnect: () => void;
};

type Room = 'general' | 'travel' | 'music';
const rooms: Room[] = ['general', 'travel', 'music'];

const serverUrl: string = 'https://localhost:1234';

const createConnection = (serverUrl: string, room: Room): ConnectionType => {
    return {
        connect() {
            console.log(`✅ Connecting to "${room}" at ${serverUrl}`);
        },
        disconnect() {
            console.log(`❌ Disconnected from "${room}" at ${serverUrl}`);
        }
    }
};

const Chatroom = ({ room }: { room: Room }): React.JSX.Element => {
    const [message, setMessage] = useState<string>('');

    useEffect(() => {
        const connection: ConnectionType = createConnection(serverUrl, room);
        connection.connect();
        return () => connection.disconnect();
    }, [room]);

    return (
        <div className="space-y-2">
            <h2 className="text-xl font-semibold">Welcome to the {room} room!</h2>
            <TextInput value={message} onChange={e => setMessage(e.target.value)} placeholder="Say something..." />
        </div>
    );
};

export const LifeCycleChatRoomApp = (): React.JSX.Element => {
    const [room, setRoom] = useState<Room>('general');
    return (
        <div className="space-y-2">
            <label className="flex items-center space-x-2">
                <span>Choose the chat room:</span>
                <Select value={room} onChange={e => setRoom(e.target.value as Room)}>
                    {rooms.map(r => <option key={r} value={r}>{r}</option>)}
                </Select>
            </label>
            <hr className="border-black" />
            <Chatroom key={room} room={room} />
        </div>
    );
};
