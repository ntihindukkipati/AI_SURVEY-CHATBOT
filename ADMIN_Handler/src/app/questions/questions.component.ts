import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef} from '@angular/material';


@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<QuestionsComponent>) { }

  ngOnInit() {
  }

  onClose() {
    this.dialogRef.close();
  }
}
