import { ProfileProps } from "./Profile";

const PROFILES: Array<ProfileProps> = [
    {
        name: 'Maria Skłodowska-Curie',
        image: {
            imageId: 'szV5sdG',
            imageSize: 70
        },
        profession: 'physicist and chemist',
        awards: ['Nobel Prize in Physics', 'Nobel Prize in Chemistry', 'Davy Medal', 'Matteucci Medal'],
        discovered: 'polonium (chemical element)'
    },
    {
        name: 'Katsuko Saruhashi',
        image: {
            imageId: 'YfeOqp2',
            imageSize: 70
        },
        profession: 'geochemist',
        awards: ['Miyake Prize for geochemistry', 'Tanaka Prize'],
        discovered: 'a method for measuring carbon dioxide in seawater'
    }
];

export default PROFILES;
