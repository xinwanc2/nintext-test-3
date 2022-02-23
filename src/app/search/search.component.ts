import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { SearchService } from '../search.service';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit, OnDestroy {
    searchForm: FormGroup;
    submit = false;
    airlineSubscription: Subscription;

    constructor(private searchService: SearchService, private fb: FormBuilder) {
        this.searchForm = this.fb.group({
            airlineName: [''],
            stops: [''],
            airlines: [null],
        });

        this.airlineSubscription = this.searchService.filterAirlines.subscribe(
            (airlines: string[] | null) => {
                if (airlines) {
                    this.searchForm.patchValue({ airlines });
                    this.search();
                    this.searchService.filterAirlines.next(null);
                }
            }
        );
    }

    ngOnInit(): void {}

    search() {
        this.searchService.searchFlights(this.searchForm.value);
    }

    ngOnDestroy(): void {
        this.airlineSubscription.unsubscribe();
    }
}
