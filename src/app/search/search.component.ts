import { Component, OnInit } from '@angular/core'
import { SearchService } from '../search.service'

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
    constructor(private searchService: SearchService) {}

    ngOnInit(): void {}

    search() {
        this.searchService.searchFlights();
    }
}
