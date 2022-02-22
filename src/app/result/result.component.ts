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
export class ResultComponent implements OnInit {
    displayedColumns = ['airline', 'stops', 'inbound', 'outbound', 'total'];
    dataSource = new MatTableDataSource<Itinerary>();

    @ViewChild(MatPaginator) paginator!: MatPaginator;

    constructor(private dataService: FlightDataService) {}

    ngOnInit(): void {
        this.dataService.getItineraries().subscribe((res: Itinerary[]) => {
            if (res) {
                this.dataSource.data = res;
                this.dataSource.paginator = this.paginator;
            }
        });
    }
}
