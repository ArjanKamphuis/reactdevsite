type ItemType = {
    name: string;
    importance: number;
};

function Item({ name, importance } : ItemType): JSX.Element {
    return (
        <li>
            {name}
            {importance > 0 && <i className="ml-1">(Importance: {importance})</i>}
        </li>
    );
}

export default function PackingList(): JSX.Element {
    const items: ItemType[] = [
        { name: 'Space Suit', importance: 9 },
        { name: 'Helmet with a golden leaf', importance: 0 },
        { name: 'Photo of Tam', importance: 6 },
    ];

    return (
        <section className="space-y-2 p-5 border border-black rounded-xl">
            <h1 className="text-2xl font-bold">Sally Ride&apos;s Packing List</h1>
            <ul className="list-inside list-disc leading-none">
                {items.map((item: ItemType, index: number) => <Item name={item.name} importance={item.importance} key={index} />)}
            </ul>
        </section>
    );
}
