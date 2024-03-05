import Gallery from "./gallery";
import { getImageUrl } from "../common/utils";
import profiles from './profiles';
import Card from './card';
import PackingList from "./packing-list";
import DrinkList from "./drink-list";
import Image from "next/image";
import RenderingList from "./rendering-lists";
import RecipeList from "./recipe-list";
import Poem from "./poem";
import PureComponents from "./pure-components";

type Person = {
    name: string;
    imageId: string;
    imageSize: string;
    theme: {
        backgroundColor: string;
        color: string;
    };
    imageUrl: string;
};

interface ToDoListProps {
    person: Person;
    baseUrl: string;
}

function ToDoList({ person, baseUrl }: ToDoListProps): JSX.Element {
    return (
        <div style={person.theme} className="p-4 space-y-2">
            <h1 className="text-2xl font-bold">{person.name}&apos;s Todos</h1>
            <Image className="h24 rounded-full" src={getImageUrl(person.imageId, person.imageSize)} alt="Gregorio Y. Zara" width={160} height={160} />
            <ul className="list-disc list-inside leading-none">
                <li>Improve the videophone</li>
                <li>Prepare aeronautics lectures</li>
                <li>Work on the alcohol-fuelled engine</li>
            </ul>
        </div>
    );
}

function Bio(): JSX.Element {
    return (
        <div>
            <div className="intro">
                <h1>Welcome to my website!</h1>
            </div>
            <p className="summary">
                You can find my thoughts here.
                <br /><br />
                <b>And <i>pictures</i></b> of scientists!
            </p>
        </div>
    );
}

function Avatar({person, size }: { person: { name: string, imageId: string }, size: number }): JSX.Element {
    return (<Image className="inline rounded-full" src={getImageUrl(person.imageId, size > 90 ? 'b': 's')} alt={person.name} width={size} height={size} />);
}

function AvatarContainer(): JSX.Element {
    return (
        <section className="space-y-2 p-5 border border-black rounded-xl">
            <h2 className="text-2xl font-bold">Adjust Image size</h2>
            <div className="space-x-2">
                <Avatar size={40} person={{ name: 'Gregorio Y. Zara', imageId: '7vQD0fP'}} />
                <Avatar size={120} person={{ name: 'Gregorio Y. Zara', imageId: '7vQD0fP'}} />
            </div>
        </section>
    );
}

export default function App(): JSX.Element {
    return (
        <div className="space-y-4">
            <PureComponents />
            <Poem />
            <RecipeList />
            <RenderingList />
            <DrinkList />
            <PackingList />
            <Card />
            <AvatarContainer />
            <Gallery profiles={profiles} />
            <Bio />
            <ToDoList person={PERSON} baseUrl={BASE_URL} />
        </div>
    );
}

const BASE_URL: string = 'https://i.imgur.com/';
const PERSON: Person = {
    name: 'Gregory Y. Zara',
    imageId: '7vQD0fP',
    imageSize: 'b',
    theme: {
        backgroundColor: 'black',
        color: 'pink'
    },
    imageUrl: 'https://i.imgur.com/7vQD0fPs.jpg'
};
