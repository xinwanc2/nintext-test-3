import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FlightDataService, Itinerary } from './flight-data.service';
import { Search } from './search/search.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class SearchService {
    filterAirlines: BehaviorSubject<string[] | null> = new BehaviorSubject<
        string[] | null
    >(null);
    constructor(
        private http: HttpClient,
        private dataService: FlightDataService
    ) {}

    // TODO: filter result based on airline name and stops search criteria
    searchFlights(search: Search) {
        if (!search.airlines || !search.airlines.length) {
            return this.dataService.setItineraries([]);
        }
        this.http
            .get<Itinerary[]>(
                'https://nmflightapi.azurewebsites.net/api/flight',
                {
                    params: {
                        airlineName: search.airlineName,
                        stops: search.stops,
                    },
                }
            )
            .subscribe((itineraries: Itinerary[]) => {
                this.dataService.setItineraries(itineraries);
            });
    }
}
