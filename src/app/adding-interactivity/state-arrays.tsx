import { useState } from "react";
import Button from "../common/button";
import { TaskApp, TaskAppImmer } from "./state-arrays-todos";

type Product = {
    id: number;
    name: string;
    count: number;
};

const initialProducts: Product[] = [{
    id: 0,
    name: 'Baklava',
    count: 1
}, {
    id: 1,
    name: 'Cheese',
    count: 5
}, {
    id: 2,
    name: 'Spaghetti',
    count: 2
}];

function ShoppingCart(): JSX.Element {
    const [products, setProducts] = useState<Product[]>(initialProducts);

    function handleIncreaseClick(productId: number): void {
        setProducts(products.map(product => product.id === productId ? { ...product, count: product.count + 1 } : product));
    }

    function handleDecreaseClick(productId: number): void {
        const nextProducts: Product[] = products.map(product => product.id === productId ? { ...product, count: product.count - 1 } : product);
        setProducts(nextProducts.filter(product => product.count > 0));
    }

    return (
        <ul className="list-disc list-inside space-y-2">
            {products.map(product => (
                <li key={product.id}>
                    {product.name} (<b>{product.count}</b>)
                    {' '}<Button onClick={() => { handleIncreaseClick(product.id)}}>+</Button>
                    {' '}<Button onClick={() => { handleDecreaseClick(product.id) }}>-</Button>
                </li>
            ))}
        </ul>
    )
}

export default function StateArrays(): JSX.Element {
    return (
        <section className="border border-black rounded-xl p-5 space-y-4 w-fit">
            <h1 className="text-2xl font-bold">Updating Arrays in State</h1>
            <ShoppingCart />
            <TaskApp />
            <TaskAppImmer />
        </section>
    )
}
