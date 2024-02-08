import Profile from "./Profile";
import { ProfileProps } from "./Profile";

export default function Gallery({ profiles }: { profiles: Array<ProfileProps> }): JSX.Element {
    return (
        <div className="space-y-4">
            <h1 className="text-2xl font-bold">Notable Scientists</h1>
            {profiles.map((profile, index) => <Profile profile={profile} key={index} />)}
        </div>
    );
}
