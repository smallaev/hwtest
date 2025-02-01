"use client"
import { destinations } from "@/data";
import { useEffect, useState } from "react";
import { LocalStorageKeys, Trip, TripDestinationsMap } from "@/app/trip/helpers";
import { PlusIcon } from '@heroicons/react/24/solid';
import TripTile, { loadTripDestinations, loadTrips } from "@/components/TripTile";
import DraggableDestinationTile from "@/components/DraggableDestinationTile";
import { DndContext, DragEndEvent } from '@dnd-kit/core';

export default function Home() {
    const [trips, setTrips] = useState<Trip[]>([]);
    const [tripsDestinations, setTripDestinations] = useState<TripDestinationsMap>([]);

    useEffect(() => {
        setTrips(loadTrips());
        setTripDestinations(loadTripDestinations());
    }, []);

    const addTrip = () => {
        const newId = trips.length + 1;
        const newTrip = {
            id: newId,
            name: 'Trip ' + newId
        };

        const newTrips = [...trips, newTrip];
        setTrips(newTrips);
        localStorage.setItem(LocalStorageKeys.Trips, JSON.stringify(newTrips));
    }

    const addDestinationToTrip = (tripId: number, destId: number) => {
        const newMap = { ...tripsDestinations };

        if (!newMap[tripId]) {
            newMap[tripId] = [];
        } else {
            if (newMap[tripId].indexOf(destId) >= 0) {
                alert('item already in the trip');
                return;
            }
        }

        const newArr = [...newMap[tripId], destId];
        newMap[tripId] = newArr;

        setTripDestinations(newMap);
        localStorage.setItem(LocalStorageKeys.TripsDestinations, JSON.stringify(newMap));
    }

    function handleDragEnd(e: DragEndEvent) {
        if (e.active && e.over) {
            addDestinationToTrip(e.over.id as number, e.active.id as number);
        }
    }

    return (
        <DndContext id="unique-dnd-context-id" onDragEnd={handleDragEnd}>
            <div className="min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
                <main>
                    <h2 className="text-2xl font-bold mb-[1em] text-center">Destinations</h2>
                    <section className="flex sm:justify-center gap-8 items-center flex-wrap mb-[2em]">
                        {Object.values(destinations).map(destination => {
                            return <DraggableDestinationTile
                                destination={destination}
                                key={destination.id}
                            />
                        })}
                    </section>
                    
                    <h2 className="text-2xl font-bold mb-[1em] text-center">My trips</h2>
                    <section className="flex justify-center gap-8 row-start-2 flex-wrap">
                        {trips.map(trip => {
                            return <TripTile
                                trip={trip}
                                tripDestinations={tripsDestinations}
                                key={trip.id}
                            />
                        })}
                        <div>
                            <button 
                                className="flex justify-center items-center w-[300px] h-[180px] border rounded border-gray-400"
                                onClick={addTrip}
                            ><PlusIcon className="size-6 text-gray-500" />Add a new trip</button>
                        </div>
                    </section>
                </main>
            </div>
        </DndContext>
    );
}
