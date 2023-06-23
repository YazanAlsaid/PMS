import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Data, Router} from '@angular/router';
import {MatPaginator} from "@angular/material/paginator";
import {MatDialog} from '@angular/material/dialog';
import {AddUserDialogComponent} from '../add-user-dialog/add-user-dialog.component';
import {AddSlotDialogComponent} from "../add-slot-dialog/add-slot-dialog.component";
import {Chart, registerables} from 'chart.js';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  sub: any;
  public myBreakPoint: number = 0;
  public chart: any = [];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog) {
    Chart.register(...registerables);
  }

  data: Data | undefined;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit() {
    this.sub = this.activatedRoute.data.subscribe((v) => (this.data = v));
    this.myBreakPoint = (window.innerWidth <= 600) ? 1 : 4;
    if (window.innerWidth > 950)
      this.myBreakPoint = 4;
    else if (window.innerWidth >= 750 && window.innerWidth <= 950)
      this.myBreakPoint = 3;
    else if (window.innerWidth >= 550 && window.innerWidth <= 750)
      this.myBreakPoint = 2;
    else if (window.innerWidth <= 550)
      this.myBreakPoint = 1;

    this.chart = new Chart('canvas', {
      type: 'bar',
      data: {
        labels: [],
        datasets: []
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            display: true,
          },
          x: {
            display: true
          }
        }
      }
    });
    this.onMonth();
  }

  handleSize(event: any) {
    if (event.target.innerWidth > 950)
      this.myBreakPoint = 4;
    else if (event.target.innerWidth >= 750 && event.target.innerWidth <= 950)
      this.myBreakPoint = 3;
    else if (event.target.innerWidth >= 550 && event.target.innerWidth <= 750)
      this.myBreakPoint = 2;
    else if (event.target.innerWidth <= 550)
      this.myBreakPoint = 1;
  }

  edit(e: any) {
    console.log({e});
  }

  create() {
    if (this.data != null && this.data["title"] === "User") {
      this.createUser();
    } else if (this.data != null && this.data["title"] === "Slot") {
      this.createSlot();
    }
  }

  createUser(): void {
    const dialogRef = this.dialog.open(AddUserDialogComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      // Handle any actions after the dialog is closed
      console.log('Dialog closed', result);
    });
  }

  createSlot() {
    const dialogRef = this.dialog.open(AddSlotDialogComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      // Handle any actions after the dialog is closed
      console.log('Dialog closed', result);
    });
  }

  onWeek() {
    this.removeDataChart();

    const labels = ["KW1", "KW2", "KW3", "KW4", "KW5", "KW6", "KW7", "KW8", "KW9", "KW10", "KW11", "KW12",
      "KW13", "KW14", "KW15", "KW16", "KW17", "KW18", "KW19", "KW20", "KW21", "KW22", "KW23",
      "KW24", "KW25", "KW26", "KW27", "KW28", "KW29", "KW30", "KW31", "KW32", "KW34", "KW35",
      "KW36", "KW37", "KW38", "KW39", "KW40", "KW41", "KW42", "KW43", "KW44", "KW45", "KW46",
      "KW47", "KW48", "KW49", "KW50", "KW51", "KW52"];
    for (let label of labels) {
      this.chart.data.labels.push(label);
    }
    const data = [10, 25, 14, 13, 78, 45, 21, 25, 32, 24, 57, 62,
      10, 25, 14, 13, 78, 45, 21, 25, 32, 24, 57, 62,
      10, 25, 14, 13, 78, 45, 21, 25, 32, 24, 57, 62,
      10, 25, 14, 13, 78, 45, 21, 25, 32, 24, 57, 62,
      10, 25, 14, 13, 78, 45, 21, 25, 32, 24, 57, 62, 45, 12];
    const dataset = {
      label: '# of Reservations',
      data: data,
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)'
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
      ],
      borderWidth: 1
    };

    this.chart.data.datasets.push(dataset);
    this.chart.update();
  }

  onMonth() {
   this.removeDataChart();

    const labels = ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'June', 'July', 'Aug.', 'Sept.', 'Oct.', 'Nov.', 'Dec.']
    for (let label of labels) {
      this.chart.data.labels.push(label);
    }

    const data = [100, 250, 140, 130, 780, 450, 210, 250, 320, 240, 570, 620];
    const dataset = {
      label: '# of Reservations',
      data: data,
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)'
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
      ],
      borderWidth: 1
    }

    this.chart.data.datasets.push(dataset);
    this.chart.update();
  }

  private removeDataChart(){
    this.chart.data.labels = [];
    this.chart.data.datasets.pop();
    this.chart.update();
  }
}
