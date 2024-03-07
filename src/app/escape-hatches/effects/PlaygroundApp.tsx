import TextInputField from "@/app/common/TextInputField";
import Button from "@/app/common/button";
import { useEffect, useState } from "react";

function Playground(): React.JSX.Element {
    const [text, setText] = useState<string>('a');

    useEffect(() => {
        function onTimeout(): void {
            return console.log(`⏰ ${text}`);
        }

        console.log(`🔵 Schedule "${text}" log`);
        const timeoutId: NodeJS.Timeout = setTimeout(onTimeout, 3000);

        return () => {
            console.log(`🟡 Cancel "${text}" log`);
            clearTimeout(timeoutId);
        }
    }, [text]);

    return (
        <div className="space-y-2">
            <TextInputField label="What to log:" labelWidth="w-40" textInputProps={{ value: text, onChange: e => setText(e.target.value)}} />
            <p className="text-lg font-medium">{text}</p>
        </div>
    );
}

export default function PlaygroundApp(): React.JSX.Element {
    const [show, setShow] = useState<boolean>(false);
    return (
        <div className="space-y-2">
            <Button onClick={() => setShow(!show)}>{show ? 'Unmount' : 'Mount'}</Button>
            {show && <hr className="border-black" />}
            {show && <Playground />}
        </div>
    );
}