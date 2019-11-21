import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {QuestionsComponent} from 'src/app/questions/questions.component';
import {ApiService} from '../api.service';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';

@Component({
  selector: 'app-prof-dashboard',
  templateUrl: './prof-dashboard.component.html',
  styleUrls: ['./prof-dashboard.component.css']
})
export class ProfDashboardComponent implements OnInit {
  sentMail = {};
  quesForm: FormGroup;
  constructor(public dialog: MatDialog, private api: ApiService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.quesForm = this.formBuilder.group({
      'roles': [null, Validators.required],
      'eObj': [null, Validators.required],
      'duration': [null, Validators.required],
      'cName': [null, Validators.required],
      'sEmails': [null, Validators.required]
    });
  }
  onFormSubmit(form: NgForm) {

  }

  sendEmail(emailIds: string) {
      console.log("SEnding email ");
      console.log("email ids",emailIds);
      this.api.sendEmail(emailIds)
        .subscribe(res => {
          console.log(res);
          this.sentMail = res;
        }, (err) => {
          console.log(err);
        });
  }

  onAdd() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '40%';
    this.dialog.open(QuestionsComponent, dialogConfig);
  }
}
