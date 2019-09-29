import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AgGridAngular } from 'ag-grid-angular';


@Component({
  selector: 'app-aggrid',
  templateUrl: './aggrid.component.html',
  styleUrls: ['./aggrid.component.scss']
})
export class AggridComponent implements OnInit {

  private gridApi;
  private gridColumnApi;

  private columnDefs;
  private defaultColDef;
  private rowData: [];

  constructor(private http: HttpClient) {
    this.columnDefs = [
      {
        headerName: "Athlete",
        field: "athlete",
        minWidth: 150
      },
      {
        headerName: "Age",
        field: "age",
        minWidth: 90,
        filter: "agNumberColumnFilter"
      },
      {
        headerName: "Country",
        field: "country",
      },
      {
        headerName: "Year",
        field: "year",
      },
      {
        headerName: "Date",
        field: "date",
        filter: "agDateColumnFilter",
        filterParams: {
          comparator: function(filterLocalDateAtMidnight, cellValue) {
            var dateAsString = cellValue;
            if (dateAsString == null) return -1;
            var dateParts = dateAsString.split("/");
            var cellDate = new Date(Number(dateParts[2]), Number(dateParts[1]) - 1, Number(dateParts[0]));
            if (filterLocalDateAtMidnight.getTime() == cellDate.getTime()) {
              return 0;
            }
            if (cellDate < filterLocalDateAtMidnight) {
              return -1;
            }
            if (cellDate > filterLocalDateAtMidnight) {
              return 1;
            }
          },
          browserDatePicker: true
        }
      },
      {
        headerName: "Sport",
        field: "sport",
      },
      {
        headerName: "Gold",
        field: "gold",
        filter: "agNumberColumnFilter"
      },
      {
        headerName: "Silver",
        field: "silver",
        filter: "agNumberColumnFilter"
      },
      {
        headerName: "Bronze",
        field: "bronze",
        filter: "agNumberColumnFilter"
      },
      {
        headerName: "Total",
        field: "total",
        filter: false
      }
    ];
    this.defaultColDef = { filter: true };
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    this.http
      .get("https://raw.githubusercontent.com/ag-grid/ag-grid/master/packages/ag-grid-docs/src/olympicWinners.json")
      .subscribe((data: any) => {
          console.info('final datata', data);
        this.rowData = data;
      });
  }

  ngOnInit() {
    
  }

}
