type DrinkType = {
    id: number;
    name: string;
    info: DrinkInfo;
}

type DrinkInfo = {
    part: string;
    caffeine: string;
    age: string;
};

type DescriptionList = {
    id: number;
    dt: string;
    dd: string;
};

function DescriptionListRow({ description }: { description: DescriptionList }): JSX.Element {
    return (
        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">{description.dt}</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{description.dd}</dd>
        </div>
    )
}

function Drink({ drink }: { drink: DrinkType}): JSX.Element {
    const descriptions: DescriptionList[] = [
        { id: 0, dt: 'Part of plant', dd: drink.info.part },
        { id: 1, dt: 'Caffeine content', dd: drink.info.caffeine },
        { id: 2, dt: 'Age', dd: drink.info.age }
    ];
    return (
        <section className="space-y-2">
            <h1 className="text-2xl font-bold">{drink.name}</h1>
            <dl className="divide-y divide-gray-500">
                {descriptions.map((description: DescriptionList) => <DescriptionListRow description={description} key={description.id} />)}
            </dl>
        </section>
    );
}

export default function DrinkList(): JSX.Element {
    return (
        <section className="space-y-2 p-5 border border-black rounded-xl">
            {DRINKS.map((drink: DrinkType) => <Drink drink={drink} key={drink.id} />)}
        </section>
    )
}

const DRINKS: DrinkType[] = [
    {
        id: 0,
        name: 'Tea',
        info: {
            part: 'leaf',
            caffeine: '15-70 mg/cup',
            age: '4,000+ years'
        }
    },
    {
        id: 1,
        name: 'Coffee',
        info: {
            part: 'bean',
            caffeine: '80-185 mg/cup',
            age: '1,000+ years'
        }
    }
];
