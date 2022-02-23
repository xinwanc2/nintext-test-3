import {
    AfterViewChecked,
    AfterViewInit,
    Component,
    OnInit,
    ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, of, Subscription } from 'rxjs';
import { FlightDataService, Itinerary } from '../flight-data.service';

@Component({
    selector: 'app-result',
    templateUrl: './result.component.html',
    styleUrls: ['./result.component.scss'],
})
export class ResultComponent implements OnInit {
    displayedColumns = ['airline', 'stops', 'inbound', 'outbound', 'total'];
    dataSource = new MatTableDataSource<Itinerary>();
    airlineSubscription: Subscription;
    private oriList: Itinerary[] = [];

    @ViewChild(MatPaginator) paginator!: MatPaginator;

    constructor(private dataService: FlightDataService) {
        this.airlineSubscription = this.dataService.filteredAirlines.subscribe(
            (airlines: string[] | null) => {
                if (airlines) {
                    this.dataSource.data = this.oriList.filter((x) =>
                        airlines.includes(x.AirlineName)
                    );
                    this.dataService.filteredAirlines.next(null);
                }
            }
        );
    }

    ngOnInit(): void {
        this.dataService.getItineraries().subscribe((res: Itinerary[]) => {
            if (res) {
                this.dataSource.data = res;
                this.oriList = res;
                this.dataSource.paginator = this.paginator;
            }
        });
    }

    ngOnDestroy(): void {
        this.airlineSubscription.unsubscribe();
    }
}
