import { Component, OnInit } from '@angular/core';
import { FlightDataService } from '../flight-data.service';
import { Observable, of } from 'rxjs';
import { Filter } from './filter.model';

@Component({
    selector: 'app-filter',
    templateUrl: './filter.component.html',
    styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {
    airlines$: Observable<Filter[]> = of([]);
    constructor(private dataService: FlightDataService) {}

    ngOnInit(): void {
        this.airlines$ = this.dataService.getAvailableAirlines();
    }

    filterAirlines(name: string, value: boolean): void {
        alert(value);
    }
}
