import { useState } from "react";
import { TextInputChangeEventHandler } from "../common/textInput";
import TextInputField from "../common/TextInputField";

type Food = {
    id: number;
    name: string;
    description: string;
};

const foods: Food[] = [{
    id: 0,
    name: 'Sushi',
    description: 'Sushi is a traditional Japanese dish of prepared vinegared rice'
}, {
    id: 1,
    name: 'Dal',
    description: 'The most common way of preparing dal is in the form of a soup to which onions, tomatoes and various spices may be added'
}, {
    id: 2,
    name: 'Pierogi',
    description: 'Pierogi are filled dumplings made by wrapping unleavened dough around a savoury or sweet filling and cooking in boiling water'
}, {
    id: 3,
    name: 'Shish kebab',
    description: 'Shish kebab is a popular meal of skewered and grilled cubes of meat.'
}, {
    id: 4,
    name: 'Dim sum',
    description: 'Dim sum is a large range of small dishes that Cantonese people traditionally enjoy in restaurants for breakfast and lunch'
}];

function List({ items }: { items: Food[] }): JSX.Element {
    return (
        <table>
            <thead><tr><th>Name</th><th>Description</th></tr></thead>
            <tbody>
                {items.map(food => (
                    <tr key={food.id} className="border border-black">
                        <td className="font-semibold p-2 border-r border-black text-center">{food.name}</td>
                        <td className="p-2">{food.description}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default function FilterableList(): JSX.Element {
    const [query, setQuery] = useState<string>('');
    const handleChange: TextInputChangeEventHandler = e => setQuery(e.target.value);
    return (
        <div className="space-y-2">
            <h2 className="text-xl font-semibold">Filterable List</h2>
            <TextInputField label="Search:" textInputProps={{ value: query, onChange: handleChange }}/>
            <hr className="border-black" />
            <List items={filterItems(foods, query)} />
        </div>
    )
}

function filterItems(items: Food[], query: string): Food[] {
    query = query.toLowerCase();
    return items.filter(item => item.name.split(' ').some(word => word.toLowerCase().startsWith(query)));
}
