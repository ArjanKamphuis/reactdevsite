import CheckboxField from "@/app/common/CheckboxField";
import { useEffect, useMemo, useState } from "react";

type Position = {
    x: number;
    y: number;
};

export const PinkDotSyncApp = (): React.JSX.Element => {
    const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
    const [canMove, setCanMove] = useState<boolean>(true);
    const [isVisible, setIsVisible] = useState<boolean>(false);

    const dotClasses: string = useMemo(() => {
        return `${isVisible ? 'block' : 'hidden'} absolute bg-pink-500/60 rounded-full -left-5 -top-5 w-10 h-10 pointer-events-none`;
    }, [isVisible]);

    useEffect(() => {
        const handleMove = (e: PointerEvent): void => setPosition({ x: e.clientX, y: e.clientY });
        if (canMove) {
            window.addEventListener('pointermove', handleMove);
            return (): void => window.removeEventListener('pointermove', handleMove);
        }
    }, [canMove]);

    return (
        <div className="space-y-2">
            <CheckboxField checked={canMove} onChange={e => setCanMove(e.target.checked)}>
                The dot is{!canMove && ' not'} allowed to move
            </CheckboxField>
            <CheckboxField checked={isVisible} onChange={e => setIsVisible(e.target.checked)}>
                The dot is{!isVisible && ' not'} visible
            </CheckboxField>
            <div className={dotClasses} style={{ transform: `translate(${position.x}px, ${position.y}px)` }} />
        </div>
    );
}
