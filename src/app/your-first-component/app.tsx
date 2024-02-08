import Gallery from "./gallery";
import { getImageUrl } from "./utils";
import profiles from './profiles';

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
            <h1 className="text-2xl font-bold">{person.name}'s Todos</h1>
            <img className="h24 rounded-full" src={getImageUrl(person.imageId, person.imageSize)} alt="Gregorio Y. Zara" />
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

export default function App(): JSX.Element {
    return (
        <div className="space-y-4">
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
