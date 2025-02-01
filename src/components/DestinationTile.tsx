"use client"
import { LocalStorageKeys } from "@/app/trip/helpers";
import { Destination } from "@/data";
import Image from "next/image";
import { DestinationVotes, TripsDestinationsVotesMap } from "./DestinationList";
import { ArrowUpCircleIcon } from "@heroicons/react/24/outline";

const userId = 1;

const DestinationTile: React.FC<{
    destination: Destination,
    tripId?: number,
    destVotes?: TripsDestinationsVotesMap,
    setDestVotes?: (votes: TripsDestinationsVotesMap) => void
}> = ({ destination, tripId, destVotes, setDestVotes }) => {

    const handleVote = () => {
        if (!tripId) {
            return;
        }
        if (!destVotes || !setDestVotes) {
            return;
        }

        const votes = getVotesForTripDestination(tripId, destination.id);
        if (!votes) {
            return;
        }
        const newVotes = [...votes];
        const voteIdx = newVotes.indexOf(userId);

        if (voteIdx >= 0) { // user already voted, remove vote
            newVotes.splice(voteIdx, 1);
        } else { // user hasn't voted, add vote
            newVotes.push(userId);
        }
        
        const destId = destination.id;
        
        const newDestVotes = {
            ...destVotes, [tripId]: {
                ...destVotes[tripId], [destId]: newVotes 
            }
        }
        
        setDestVotes(newDestVotes);
        localStorage.setItem(LocalStorageKeys.TripsDestinationsVotes, JSON.stringify(newDestVotes));
    };

    const getVotesForTripDestination = (tripId: number, destId: number) => {
        let votes: DestinationVotes = [];
        if (!destVotes) {
            return votes;
        }
        if (destVotes[tripId]) {
            const destinationsVotes = destVotes[tripId];
            if (destinationsVotes && destinationsVotes[destId]) {
                votes = destinationsVotes[destId];
            }
        }
        return votes;
    }

    const votes = tripId ? getVotesForTripDestination(tripId, destination.id) : null;
    const hasUserVoted = votes ? votes.indexOf(userId) >= 0 : false; 
    const votedClass = hasUserVoted ? 'font-bold' : 'font-normal'

    return <div className="w-[300px] border rounded-lg p-[0.8em] bg-white">
        <Image
            className="rounded-lg"
            src={destination.imgSrc}
            alt={destination.title}
            width={300}
            height={180}
            priority
        />
        <h3 className="font-bold mt-[0.5em] mb-[0.5em]" >{ destination.title }</h3>
        { votes ? <button 
            className={`rounded p-[5px] border w-[60px] flex justify-center items-center ${votedClass}`}
            onClick={handleVote}>
            <ArrowUpCircleIcon className="w-[20px] mr-[0.5em]" />
            { votes.length }
        </button> :
        null
        }
        
    </div>
}
export default DestinationTile;