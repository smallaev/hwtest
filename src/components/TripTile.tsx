import { LocalStorageKeys, Trip, TripDestinationsMap } from "@/app/trip/helpers";
import { Destination, destinations } from "@/data";
import { useDroppable } from '@dnd-kit/core';
import Image from "next/image";
import Link from "next/link";

export const loadTrips = () => {
    let tripsArr: Trip[] = [];
  
    const tripsStr = window.localStorage.getItem(LocalStorageKeys.Trips);  
    if (tripsStr) {
      tripsArr = JSON.parse(tripsStr);
    }
  
    return tripsArr;
}

export const loadTripDestinations = () => {
    let tripsDestinationsObj: TripDestinationsMap = {};
  
    const itemsStr = window.localStorage.getItem(LocalStorageKeys.TripsDestinations);
    if (itemsStr) {
      tripsDestinationsObj = JSON.parse(itemsStr);
    }
  
    return tripsDestinationsObj;
}

export const getDestinationsForTrip = (tripId: number, tripsDestinations: TripDestinationsMap) => {
    const destinationIds = tripsDestinations[tripId];
    let destArr: Destination[] = [];
    if (destinationIds) {
        destArr = destinationIds.map(destId => {
            return destinations[destId];
        });
    }
    return destArr;
}

const TripTile: React.FC<{
    trip: Trip,
    tripDestinations: TripDestinationsMap
}> = ({ trip, tripDestinations }) => {

    const { isOver, setNodeRef } = useDroppable({
        id: trip.id,
    });

    const classes = 'relative z-0 overflow-hidden flex items-center p-[2em] w-[300px] h-[180px] border rounded-lg ' + (isOver ? 'border-green-200 border-[3px]' : 'border-gray-300');

    let left = -20;
    let top = 0;
    let rotate = -25;
    const destinationsForTrip = getDestinationsForTrip(trip.id, tripDestinations)
        .map(dest => {
            left += 20;
            top += 5;
            rotate += 10;
            return <Image 
                src={dest.imgSrc} 
                alt={dest.title}
                key={dest.id}
                width={300}
                height={200}
                className="absolute rounded-lg transform border-[2px] border-white"
                style={{
                    left: left + 'px',
                    top: top + 'px',
                    transform: `rotate(${rotate}deg)`,
                }}
            />
        }
 );

    return <Link href={'/trip/' + trip.id} className="mb-[1em]" ref={setNodeRef}>
        <div
            key={trip.id}
            className={classes}
        >
            { destinationsForTrip.length > 0 ? 
                destinationsForTrip : 
                'This trip is empty. Drag destinations here to add them' 
            }
        </div>
        <h3 className="font-bold mt-[0.8em]">
            {trip.name}
        </h3>
    </Link>
}

export default TripTile;