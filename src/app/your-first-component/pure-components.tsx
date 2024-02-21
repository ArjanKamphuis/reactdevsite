import { ComponentType } from "react";
import dynamic from 'next/dynamic'

import Clock from "./broken-clock";
import Profile from "./broken-profile";
 
const StoryApp: ComponentType<{}> = dynamic(() => import('./broken-story'), { ssr: false })

export default function PureComponents(): JSX.Element {
    return (
        <section className="space-y-2 p-5 border border-black rounded-xl w-fit">
            <h1 className="text-2xl font-bold">Pure Components</h1>
            <Clock time={new Date()} />
            <div className="flex space-x-2">
                <div className="space-y-2">
                    <Profile person={{ imageId: 'lrWQx8l', name: 'Subrahmanyan Chandrasekhar'}} />
                    <Profile person={{ imageId: 'MK3eW3A', name: 'Creola Katherine Johnson'}} />
                </div>
                <StoryApp />
            </div>
        </section>
    );
}
