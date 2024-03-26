import { Dispatch, SetStateAction, useEffect, useState } from "react";

type ResolveType = {
    id: string;
    name: string;
};

export type Planet = ResolveType;
export type Place = ResolveType;

export function useSelectOptions<T extends ResolveType>(url: string | null): [list: T[], id: string, setId: Dispatch<SetStateAction<string>>] {
    const [list, setList] = useState<T[]>([]);
    const [id, setId] = useState<string>('');

    useEffect(() => {
        if (!url) return;
        let ignore = false;
        fetchData(url).then(result => {
            if (!ignore) {
                console.log(`Fetched a list from "${url}".`);
                setList(result as T[]);
                setId(result[0].id);
            }
        });
        return (): void => { ignore = true; };
    }, [url]);

    return [list, id, setId];
}

export function fetchData(url: string): Promise<ResolveType[]> {
    if (url === '/planets') {
        return fetchPlanets();
    } else if (url.startsWith('/planets/')) {
        const match: RegExpMatchArray | null = url.match(/^\/planets\/([\w-]+)\/places(\/)?$/);
        if (!match || !match[1] || !match[1].length) {
            throw Error(`Expected URL like "/planets/earth/places". Received: "${url}".`);
        }
        return fetchPlaces(match[1]);
    } else {
        throw Error(`Expected URL like "/planets" or "/planets/earth/places". Received: "${url}".`);
    }
}

async function fetchPlanets(): Promise<ResolveType[]> {
    return new Promise<ResolveType[]>(resolve => {
        setTimeout(() => {
            resolve([{
                id: 'earth',
                name: 'Earth'
            }, {
                id: 'venus',
                name: 'Venus'
            }, {
                id: 'mars',
                name: 'Mars'
            }]);
        }, 1000);
    })
}

async function fetchPlaces(planetId: string): Promise<ResolveType[]> {
    return new Promise<ResolveType[]>(resolve => {
        setTimeout(() => {
            if (planetId === 'earth') {
                resolve([{
                    id: 'laos',
                    name: 'Laos'
                }, {
                    id: 'spain',
                    name: 'Spain'
                }, {
                    id: 'vietnam',
                    name: 'Vietnam'
                }]);
            } else if (planetId === 'venus') {
                resolve([{
                    id: 'aurelia',
                    name: 'Aurelia'
                }, {
                    id: 'diana-chasma',
                    name: 'Diana Chasma'
                }, {
                    id: 'kumsong-vallis',
                    name: 'Kŭmsŏng Vallis'
                }]);
            } else if (planetId === 'mars') {
                resolve([{
                    id: 'aluminum-city',
                    name: 'Aluminum City'
                }, {
                    id: 'new-new-york',
                    name: 'New New York'
                }, {
                    id: 'vishniac',
                    name: 'Vishniac'
                }]);
            } else throw Error(`Unknown planet ID: ${planetId}`);
        }, 1000);
    });
}
