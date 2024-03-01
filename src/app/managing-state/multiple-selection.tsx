import { useState } from "react";
import { LetterType, letters } from "./letters";

type LetterProps = {
    letter: LetterType;
    onToggle: (toggleId: number) => void;
    isSelected: boolean;
};

function Letter({ letter, onToggle, isSelected }: LetterProps): JSX.Element {
    const labelClasses: string = `space-x-2 px-2 py-1 rounded-xl${isSelected ? ' bg-[#d2eaff]' : ''}`;
    return (
        <li>
            <label className={labelClasses}>
                <span>&#128231;</span>
                <input type="checkbox" checked={isSelected} onChange={() => onToggle(letter.id)} />
                <span>{letter.subject}</span>
            </label>
        </li>
    );
}

export default function MultipleSelectionMailbox(): JSX.Element {
    const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());

    function handleToggle(toggleId: number): void {
        const nextIds: Set<number> = new Set(selectedIds);
        if (nextIds.has(toggleId)) { 
            nextIds.delete(toggleId);
        } else {
            nextIds.add(toggleId);
        }
        setSelectedIds(nextIds);
    }

    return (
        <div className="space-y-2">
            <h2 className="text-xl font-semibold">Multiselect Inbox</h2>
            <ul className="space-y-2">
                {letters.map(letter => <Letter key={letter.id} letter={letter} onToggle={handleToggle} isSelected={selectedIds.has(letter.id)} />)}
            </ul>
            <div className="border-t border-black">
                <b>You selected {selectedIds.size} letter{selectedIds.size !== 1 ? 's' : ''}</b>
            </div>
        </div>
    );
}
