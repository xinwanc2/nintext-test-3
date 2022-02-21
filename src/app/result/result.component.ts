import {
    AfterViewChecked,
    AfterViewInit,
    Component,
    OnInit,
    ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, of } from 'rxjs';
import { FlightDataService, Itinerary } from '../flight-data.service';

@Component({
    selector: 'app-result',
    templateUrl: './result.component.html',
    styleUrls: ['./result.component.scss'],
})
export class ResultComponent implements OnInit, AfterViewInit {
    itineraries$: Observable<Itinerary[]> = of([]);
    displayedColumns = ['airline', 'stops', 'inbound', 'outbound', 'total'];
    dataSource!: MatTableDataSource<Itinerary>;

    @ViewChild(MatPaginator) paginator!: MatPaginator;

    constructor(private dataService: FlightDataService) {}

    ngOnInit(): void {
        this.itineraries$ = this.dataService.getItineraries();
        this.dataService
            .getItineraries()
            .subscribe((itineries: Itinerary[]) => {
                this.dataSource = new MatTableDataSource<Itinerary>(itineries);
            });
    }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
    }
}
