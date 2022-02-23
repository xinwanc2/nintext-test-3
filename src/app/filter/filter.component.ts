import { Component, OnInit } from '@angular/core';
import { FlightDataService, Itinerary } from '../flight-data.service';
import { Observable, of } from 'rxjs';
import { Filter } from './filter.model';
import { map } from 'rxjs/operators';
import { isTextInput } from '@angular/cdk/testing/testbed/fake-events/type-in-element';

@Component({
    selector: 'app-filter',
    templateUrl: './filter.component.html',
    styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {
    airlines: Filter[] = [];
    constructor(private dataService: FlightDataService) {}

    ngOnInit(): void {
        this.dataService
            .getAvailableAirlines()
            .subscribe((airlines: Filter[]) => {
                this.airlines = airlines;
            });
    }

    filterAirlines(airline: Filter, event: any): void {
        airline.checked = event.target.checked;
        const filteredAirlines = this.airlines
            .filter((x) => x.checked)
            .map((x) => x.name);

        this.dataService.filteredAirlines.next(filteredAirlines);
    }
}
