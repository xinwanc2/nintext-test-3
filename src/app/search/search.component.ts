import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { SearchService } from '../search.service';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
    searchForm: FormGroup;
    submit = false;

    constructor(private searchService: SearchService, private fb: FormBuilder) {
        this.searchForm = this.fb.group({
            airlineName: [''],
            stops: [''],
        });
    }

    ngOnInit(): void {}

    search() {
        this.searchService.searchFlights(this.searchForm.value);
    }
}
