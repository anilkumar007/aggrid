import { Component, OnInit, ViewChild,  Input} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AgGridAngular } from 'ag-grid-angular';
import {FormControl} from '@angular/forms';
import {MatDialog, MatDialogConfig} from "@angular/material";
import {InputboxComponent} from "./inputbox/inputbox.component";


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    @Input()
  private gridApi;
  private gridColumnApi;

  private columnDefs;
  private defaultColDef;
  private rowData: [];
  title = 'developerNotes';
  tabs = ['First'];
  selected = new FormControl(0);

  constructor(private http: HttpClient, private dialog: MatDialog) {
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

  addTab(selectAfterAdding: boolean) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {};
    dialogConfig.data.description = '';

    const dialogRef = this.dialog.open(InputboxComponent,
        dialogConfig);


    dialogRef.afterClosed().subscribe(
        val => {
          console.log("Dialog output:", val);
          if (val) {
            this.tabs.push(val.description);
            this.selected.setValue(this.tabs.length - 1);
          }

        });


    // if (selectAfterAdding) {
    //   this.selected.setValue(this.tabs.length - 1);
    // }
  }

  removeTab(index: number) {
    this.tabs.splice(index, 1);
  }
}