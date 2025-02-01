"use client"

import { LocalStorageKeys } from "@/app/trip/helpers";
import { getDestinationsForTrip, loadTripDestinations } from "./TripTile";
import DestinationTile from "./DestinationTile";
import { useEffect, useState } from "react";

// [ { tripId: { destId: [user ids] } } ]
export type DestinationVotes = number[];
export type DestinationsVoteMap = Record<number, DestinationVotes>;
export type TripsDestinationsVotesMap = Record<number, DestinationsVoteMap>;

const tripDestinationsMap = loadTripDestinations();
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

    const destinationsForTrip = getDestinationsForTrip(tripId, tripDestinationsMap);
    const [destVotes, setDestVotes] = useState<TripsDestinationsVotesMap>({});


    useEffect(() => {
        setDestVotes(loadVotes());
    }, []);

    return <>
        <div className="flex justify-center gap-8 flex-wrap lg:flex-nowrap"> 
            { destinationsForTrip.length > 0 ?
                destinationsForTrip.map(destination => {
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
                This trip is empty. To add destinations, drag them from the home page into the trip
            </>
        }
        </div>
    </>

}

export default DestinationList;