import { useState } from "react";
import TextInput from "../common/textInput";
import Button from "../common/button";

type Item = {
    id: number;
    title: string;
    packed: boolean;
};

type AddItemHandler    = (title: string)  => void;
type ChangeItemHandler = (nextItem: Item) => void;
type DeleteItemHandler = (itemId: number) => void;

type PackingListProps = {
    items: Item[];
    onChangeItem: ChangeItemHandler;
    onDeleteItem: DeleteItemHandler;
};

const initialitems: Item[] = [
    { id: 0, title: 'Warm socks', packed: true },
    { id: 1, title: 'Travel journal', packed: false },
    { id: 2, title: 'Watercolors', packed: false }
];

function AddItem({ onAddItem }: { onAddItem: AddItemHandler }): JSX.Element {
    const [title, setTitle] = useState<string>('');
    return (
        <div className="flex space-x-2">
            <TextInput placeholder="Add item..." value={title} onChange={e => setTitle(e.target.value)} />
            <Button onClick={() => { setTitle(''); onAddItem(title); }}>Add</Button>
        </div>
    );
}

function PackingList({ items, onChangeItem, onDeleteItem }: PackingListProps): JSX.Element {
    return (
        <ul className="space-y-2">
            {items.map(item => (
                <li key={item.id} className="flex justify-between">
                    <label>
                        <input type="checkbox" checked={item.packed} onChange={e => onChangeItem({ ...item, packed: e.target.checked })} />
                        {' '}{item.title}
                    </label>
                    <Button onClick={() => onDeleteItem(item.id)}>Delete</Button>
                </li>
            ))}
        </ul>
    );
}

export default function TravelPlan(): JSX.Element {
    const [items, setItems] = useState<Item[]>(initialitems);
    const total: number = items.length;
    const packed: number = items.filter(item => item.packed).length;

    const handleAddItem:    AddItemHandler    = title    => setItems([...items, { id: total, title: title, packed: false }]);
    const handleChangeItem: ChangeItemHandler = nextItem => setItems(items.map(item => item.id === nextItem.id ? nextItem : item));
    const handleDeleteItem: DeleteItemHandler = itemId   => setItems(items.filter(item => item.id !== itemId));

    return (
        <div className="space-y-2">
            <AddItem onAddItem={handleAddItem} />
            <PackingList items={items} onChangeItem={handleChangeItem} onDeleteItem={handleDeleteItem} />
            <div className="border-t border-black">
                <b>{packed} out of {total} packed!</b>
            </div>
        </div>
    );
}
