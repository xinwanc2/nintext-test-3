import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Filter } from './filter/filter.model';

export interface Itinerary {
    AirlineLogoAddress: string;
    AirlineName: string;
    InboundFlightsDuration: string;
    OutboundFlightsDuration: string;
    Stops: number;
    TotalAmount: number;
}

@Injectable({
    providedIn: 'root',
})
export class FlightDataService {
    filteredAirlines: BehaviorSubject<string[] | null> = new BehaviorSubject<
        string[] | null
    >(null);
    private itineraries: BehaviorSubject<Itinerary[]> = new BehaviorSubject<
        Itinerary[]
    >([]);

    constructor() {}

    setItineraries(itineraries: Itinerary[]) {
        this.itineraries.next(itineraries);
    }

    getItineraries(): Observable<Itinerary[]> {
        return this.itineraries.asObservable();
    }

    getAvailableAirlines(): Observable<Filter[]> {
        return this.getItineraries().pipe(
            map((itineraries) => {
                const airlines: Filter[] = [];

                itineraries.forEach((i) => {
                    if (!airlines.some((x) => x.name === i.AirlineName)) {
                        airlines.push(new Filter(i.AirlineName));
                    }
                });

                return airlines;
            })
        );
    }
}
