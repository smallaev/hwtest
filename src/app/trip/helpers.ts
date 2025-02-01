export type Trip = {
    id: number,
    name: string
}

export enum LocalStorageKeys {
    Trips = 'hw-test:trips',
    TripsDestinations = 'hw-test:trips-destinations',
    TripsDestinationsVotes = 'hw-test:trips-destinations-votes',
};

export type TripDestinationsMap = { [key: number]: number[] };
