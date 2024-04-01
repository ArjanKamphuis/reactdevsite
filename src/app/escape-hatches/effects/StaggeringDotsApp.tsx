import CheckboxField from "@/app/common/CheckboxField";
import { useEffect, useState } from "react";

type Position = {
    x: number;
    y: number;
};

type DotProps = {
    position: Position;
    opacity: number;
};

function usePointerPosition(): Position {
    const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
    useEffect(() => {
        function handleMove(e: PointerEvent): void {
            setPosition({ x: e.clientX, y: e.clientY });
        }
        window.addEventListener('pointermove', handleMove);
        return (): void => { window.removeEventListener('pointermove', handleMove); };
    }, []);
    return position;
}

function useDelayedValue<T>(value: T, delay: number): T {
    const [delayedValue, setDelayedValue] = useState<T>(value);
    useEffect(() => {
        setTimeout(() => {
            setDelayedValue(value);
        }, delay);
    }, [value, delay]);
    return delayedValue;
}

function Dot({ position, opacity }: DotProps): React.JSX.Element {
    return (
        <div className="absolute pointer-events-none -left-5 -top-5 w-10 h-10"
            style={{ opacity, transform: `translate(${position.x}px, ${position.y}px)` }}
        >
            <div className="flex w-full h-full justify-items-center text-3xl">&#128520;</div>
        </div>
    );
}

export default function StaggeringDotsApp(): React.JSX.Element {
    const [isEnabled, setIsEnabled] = useState<boolean>(false);

    const pos1: Position = usePointerPosition();
    const pos2: Position = useDelayedValue(pos1, 100);
    const pos3: Position = useDelayedValue(pos2, 200);
    const pos4: Position = useDelayedValue(pos3, 100);
    const pos5: Position = useDelayedValue(pos3, 50);
    
    return (
        <div>
            <CheckboxField checked={isEnabled} onChange={e => setIsEnabled(e.target.checked)}>Trail mouse</CheckboxField>
            {isEnabled && <div>
                <Dot position={pos1} opacity={1} />
                <Dot position={pos2} opacity={0.8} />
                <Dot position={pos3} opacity={0.6} />
                <Dot position={pos4} opacity={0.4} />
                <Dot position={pos5} opacity={0.2} />
            </div>}
        </div>
    );
}
