import Profile from "./Profile";
import { Person } from "./Profile";

export default function Gallery({ profiles }: { profiles: Array<Person> }): JSX.Element {
    return (
        <div className="space-y-4 p-5 border border-black rounded-xl">
            <h1 className="text-2xl font-bold">Notable Scientists</h1>
            {profiles.map((profile, index) => <Profile person={profile} key={index} />)}
        </div>
    );
}
