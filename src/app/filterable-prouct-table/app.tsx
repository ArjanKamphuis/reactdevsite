'use client';

import { ChangeEvent, useState } from 'react';
import './styles.css';

type ProductType = {
    category: string;
    price: string;
    stocked: boolean;
    name: string;
};

interface SearchBarProps {
    filterText: string;
    inStockOnly: boolean;
    onFilterTextChange: (setFilterText: string) => void;
    onInStockOnlyChange: (setInStockOnly: boolean) => void;
}

interface ProductTableProps {
    products: Array<ProductType>;
    filterText: string;
    inStockOnly: boolean;
}

function ProductCategoryRow({ category }: { category: string }): JSX.Element {
    return (
        <tr>
            <th colSpan={2}>
                {category}
            </th>
        </tr>
    );
}

function ProductRow({ product }: { product: ProductType }): JSX.Element {
    const name: string | JSX.Element = product.stocked ? product.name : <span style={{ color: 'red' }}>{product.name}</span>;
    return (
        <tr>
            <td>{name}</td>
            <td>{product.price}</td>
        </tr>
    );
}

function ProductTable({ products, filterText, inStockOnly }: ProductTableProps): JSX.Element {
    const rows: Array<JSX.Element> = [];
    let lastCategory: string | null = null;

    products.forEach((product: ProductType) => {
        if (product.name.toLowerCase().indexOf(filterText.toLowerCase()) === -1 || (inStockOnly && !product.stocked)) return;
        if (product.category != lastCategory) {
            rows.push(<ProductCategoryRow category={product.category} key={product.category} />);
        }
        rows.push(<ProductRow product={product} key={product.name} />);
        lastCategory = product.category;
    });

    return (
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Price</th>
                </tr>
            </thead>
            <tbody>{rows}</tbody>
        </table>
    );
}

function SearchBar({ filterText, inStockOnly, onFilterTextChange, onInStockOnlyChange }: SearchBarProps): JSX.Element {
    return (
        <form>
            <input className='px-2 py-1 rounded' value={filterText} placeholder='Search...'
                   onChange={(e: ChangeEvent<HTMLInputElement>) => onFilterTextChange(e.target.value)} />
            <label>
                <input type='checkbox' checked={inStockOnly} onChange={(e: ChangeEvent<HTMLInputElement>) => onInStockOnlyChange(e.target.checked)}/>
                {' '}
                Only show products in stock
            </label>
        </form>
    );
}

function FilterableProductTable({ products }: { products: Array<ProductType> }): JSX.Element {
    const [filterText, setFilterText] = useState<string>('');
    const [inStockOnly, setInStockOnly] = useState<boolean>(false);
    
    return (
        <div>
            <SearchBar filterText={filterText} inStockOnly={inStockOnly} onFilterTextChange={setFilterText} onInStockOnlyChange={setInStockOnly} />
            <ProductTable products={products} filterText={filterText} inStockOnly={inStockOnly} />
        </div>
    );
}

const PRODUCTS: Array<ProductType> = [
    { category: "Fruits", price: "$1", stocked: true, name: "Apple" },
    { category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit" },
    { category: "Fruits", price: "$2", stocked: false, name: "Passionfruit" },
    { category: "Vegetables", price: "$2", stocked: true, name: "Spinach" },
    { category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin" },
    { category: "Vegetables", price: "$1", stocked: true, name: "Peas" }
];

export default function App(): JSX.Element {
    return <FilterableProductTable products={PRODUCTS} />
}