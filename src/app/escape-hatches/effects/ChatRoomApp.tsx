import { useEffect } from "react";

type ConnectionType = {
    connect: () => void;
    disconnect: () => void;
};

export default function ChatRoomApp(): React.JSX.Element {
    useEffect(() => {
        const connection: ConnectionType = createConnection();
        connection.connect();
        return () => { connection.disconnect() };
    }, []);
    return <h2 className="text-xl font-semibold">Welcome to the chat!</h2>
}

function createConnection(): ConnectionType {
    return {
        connect() {
            console.log('✅ Connecting...');
        },
        disconnect() {
            console.log('❌ Disconnected.');
        }
    }
}
