"use client"

import { getDestinationsForTrip, loadTripDestinations } from "./TripTile";
import DestinationTile from "./DestinationTile";
import { useEffect, useState } from "react";
import { Destination, LocalStorageKeys } from "@/data";
import { MapIcon } from "@heroicons/react/24/outline";

// [ { tripId: { destId: [user ids] } } ]
export type DestinationVotes = number[];
export type DestinationsVoteMap = Record<number, DestinationVotes>;
export type TripsDestinationsVotesMap = Record<number, DestinationsVoteMap>;

const loadVotes = () => {
    let votesObj: TripsDestinationsVotesMap = {};
    const votesStr = localStorage.getItem(LocalStorageKeys.TripsDestinationsVotes);
    if (votesStr) {
        votesObj = JSON.parse(votesStr);
    }
    return votesObj;
}

const DestinationList: React.FC<{
    tripId: number
}> = ({ tripId }) => {
    const [destVotes, setDestVotes] = useState<TripsDestinationsVotesMap>({});
    const [destinations, setDestinations] = useState<Destination[]>([]);

    useEffect(() => {
        const tripDestinationsMap = loadTripDestinations();
        setDestVotes(loadVotes());
        setDestinations(getDestinationsForTrip(tripId, tripDestinationsMap));
    }, []);

    return <>
        <div className="flex justify-center sm:justify-start gap-8 flex-wrap lg:flex-nowrap w-[calc(100% - 240px)]">
            { destinations.length > 0 ?
                destinations.map(destination => {
                    return <DestinationTile
                        key={destination.id}
                        destination={destination}
                        tripId={tripId}
                        destVotes={destVotes}
                        setDestVotes={setDestVotes}
                    />
                })
            :
            <>
                To add destinations to this trip, drag them from the home page into the trip
            </>
        }
        </div>
        <div className="mt-[3em] pt-[3em] border-t">
            <button className="text-lg border rounded-lg flex items-center gap-3 p-[0.8em]"><MapIcon className="size-8" />Edit Trip</button>
        </div>

    </>

}

export default DestinationList;