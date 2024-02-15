type RecipeType = {
    id: string;
    name: string;
    ingredients: string[];
};

function Recipe({ recipe }: { recipe: RecipeType }): JSX.Element {
    return (
        <div>
            <h2 className="text-xl font-semibold">{recipe.name}</h2>
            <ul className="list-inside list-disc leading-none">
                {recipe.ingredients.map((ingredient: string) =>
                    <li key={ingredient}>{ingredient}</li>
                )}
            </ul>
        </div>
    );
}

export default function RecipeList(): JSX.Element {
    return (
        <section className="space-y-2 p-5 border border-black rounded-xl w-fit">
            <h1 className="text-2xl font-bold">Recipes</h1>
            <div className="flex space-x-5">
                {recipes.map((recipe: RecipeType) => <Recipe recipe={recipe} key={recipe.id} />)}
            </div>
        </section>
    );
}

const recipes: RecipeType[] = [
    {
        id: 'greek-salad',
        name: 'Greek Salad',
        ingredients: ['tomatoes', 'cucumber', 'onion', 'olives', 'feta']
    }, {
        id: 'hawaiian-pizza',
        name: 'Hawaiian Pizza',
        ingredients: ['pizza crust', 'pizza sauce', 'mozzarella', 'ham', 'pineapple']
    }, {
        id: 'hummus',
        name: 'Hummus',
        ingredients: ['chickpeas', 'olive oil', 'garlic cloves', 'lemon', 'tahini']
    }
];
