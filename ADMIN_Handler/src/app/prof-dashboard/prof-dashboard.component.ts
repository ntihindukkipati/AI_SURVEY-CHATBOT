import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {QuestionsComponent} from 'src/app/questions/questions.component';

@Component({
  selector: 'app-prof-dashboard',
  templateUrl: './prof-dashboard.component.html',
  styleUrls: ['./prof-dashboard.component.css']
})
export class ProfDashboardComponent implements OnInit {
  isShown: boolean = false;
  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  sendEmail() {

  }

  onAdd() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '40%';
    this.dialog.open(QuestionsComponent, dialogConfig);
  }
}
