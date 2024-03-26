import { Place, Planet, useSelectOptions } from "./planets-api";
import { SelectField } from "@/app/common/SelectField";

export default function PlacesApp(): React.JSX.Element {
    const [planetList, planetId, setPlanetId] = useSelectOptions<Planet>('/planets');
    const [placeList, placeId, setPlaceId] = useSelectOptions<Place>(planetId ? `/planets/${planetId}/places` : null);

    const planetName: string = planetList.find(planet => planet.id === planetId)?.name ?? '???';
    const placeName: string = placeList.find(place => place.id === placeId)?.name ?? '???';

    const planetOptions: React.JSX.Element[] = planetList.map(planet => <option key={planet.id} value={planet.id}>{planet.name}</option>);
    const placeOptions: React.JSX.Element[] = placeList.map(place => <option key={place.id} value={place.id}>{place.name}</option>);

    return (
        <div className="space-y-2">
            <SelectField label="Pick a planet:" selectProps={{ value: planetId, onChange: e => setPlanetId(e.target.value), children: planetOptions }} />
            <SelectField label="Pick a place:" selectProps={{ value: placeId, onChange: e => setPlaceId(e.target.value), children: placeOptions }} />
            <hr className="border-black" />
            <p>You are going to: {placeName} on {planetName}.</p>
        </div>
    );
}
