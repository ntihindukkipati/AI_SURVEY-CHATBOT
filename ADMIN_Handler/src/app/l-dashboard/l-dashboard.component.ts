import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {ApiService} from '../api.service';

@Component({
  selector: 'app-l-dashboard',
  templateUrl: './l-dashboard.component.html',
  styleUrls: ['./l-dashboard.component.css']
})
export class LDashboardComponent implements OnInit {

  @ViewChild('prof', {static: false}) prof: ElementRef;
  @ViewChild('address', {static: false}) address: ElementRef;
  @ViewChild('phone', {static: false}) phone: ElementRef;
  @ViewChild('email', {static: false}) email: ElementRef;
  @ViewChild('dProfName', {static: false}) dProfName: ElementRef;
  @ViewChild('eqSet', {static: false}) eqSet: ElementRef;
  @ViewChild('q1', {static: false}) q1: ElementRef;
  @ViewChild('q2', {static: false}) q2: ElementRef;
  @ViewChild('q3', {static: false}) q3: ElementRef;
  @ViewChild('q4', {static: false}) q4: ElementRef;
  @ViewChild('q5', {static: false}) q5: ElementRef;
  @ViewChild('dqSet', {static: false}) dqSet: ElementRef;
  addShown: boolean = false;
  editShown: boolean = false;
  qaddShown: boolean = false;
  qeditShown: boolean = false;
  delQShown: boolean = false;
  delShown: boolean = false;
  showEditButton: boolean = true;
  questionShow: boolean = false;
  showProfDet: boolean = false;
  buttonShow: boolean = true;
  showProfOptions: boolean = false;
  showQuesOptions: boolean = false;
  aEmail: any;
  delProfName: any;
  editProfForm: FormGroup;
  aProf: any;
  aAddress: any;
  aPhone: any;
  addProfForm: FormGroup;
  takeSelected: string;
  profDet: any;
  delSelected: string;
  updatedProf = {};
  constructor(private router: Router, private api: ApiService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.addProfForm = this.formBuilder.group({
      'a_prof': [null, Validators.required],
      'a_address': [null, Validators.required],
      'a_phone': [null, Validators.required],
      'a_email': [null, Validators.required]
    });

    this.editProfForm = this.formBuilder.group({
      'e_prof': [null, Validators.required],
      'e_address': [null, Validators.required],
      'e_phone': [null, Validators.required],
      'e_email': [null, Validators.required]
    });
  }

  onFormSubmit(form: NgForm) {

  }

  showAddProf() {
    this.addShown = ! this.addShown;
    this.editShown = false;
    this.delShown = false;
  }
  showEditProf() {
    this.editShown = ! this.editShown;
    this.addShown = false;
    this.delShown = false;
  }
  showDelProf() {
    this.delShown = ! this.delShown;
    this.editShown = false;
    this.addShown = false;
  }
  addProf(profForm) {
    this.aProf = this.prof.nativeElement.value;
    this.aAddress = this.address.nativeElement.value;
    this.aEmail = this.email.nativeElement.value;
    this.aPhone = this.phone.nativeElement.value;
    if (this.aProf.length <= 0 || this.aAddress.length <= 0 || this.aEmail.length <= 0 || this.aPhone.length <= 0 ) {
      alert('Please fill all the fields');
    } else {
      console.log('profName:' + this.aProf);
      alert('Professor added successfully');
    }
    this.api.addProf(profForm)
      .subscribe(res => {
        let id = res['_id'];
        console.log("in add prof");
        /*this.router.navigate(['/l-dashboard', id]);*/
      }, (err) => {
        console.log(err);
      });
  }


  getSelectedValue(selectedValue:string){
    console.log('value is ',selectedValue);
    this.takeSelected = selectedValue;
    this.api.getProf(selectedValue)
      .subscribe(res => {
        /* let id = res['_id'];
         this.router.navigate(['/g-dashboard', id]);*/
        console.log(res);
        this.profDet = res;
      }, (err) => {
        console.log(err);
      });
  }

  editProf() {
    this.showProfDet = ! this.showProfDet;
    this.showEditButton = false;
  }
  saveProfessor(editProfForm) {
    this.showEditButton = true;
    this.showProfDet = false;
    alert("Professor saved successfully");
    console.log("form ",editProfForm);
    console.log("value", this.takeSelected);
    this.api.updateProf(this.takeSelected, this.profDet)
      .subscribe(res => {
        console.log(res);
        this.updatedProf = res;
      }, (err) => {
        console.log(err);
      });
  }

  showProf() {
    this.showProfOptions = ! this.showProfOptions;
    this.showQuesOptions = false;
    this.qeditShown = false;
    this.delQShown = false;
    this.qaddShown = false;
  }

  showQues() {
    this.showQuesOptions = ! this.showQuesOptions;
    this.showProfOptions = false;
    this.editShown = false;
    this.delShown = false;
    this.addShown = false;
  }

  deleteSelectedValue(delSel: string){
    this.delSelected = delSel;
  }

  delProf() {
    /*this.aProf = this.aProf.nativeElement.value;*/
    console.log('to be deleted' + this.aProf);
    this.api.deleteProf(this.delSelected)
      .subscribe(res => {
        console.log(res);
        this.updatedProf = res;
      }, (err) => {
        console.log(err);
      });
    alert('Deleted Successfully');
  }
  showAddQues() {
    this.qaddShown = ! this.qaddShown;
    this.qeditShown = false;
    this.delQShown = false;
  }
  showEditQues() {
    this.qeditShown = ! this.qeditShown;
    this.qaddShown = false;
    this.delQShown = false;
  }
  showDelQues() {
    this.delQShown = ! this.delQShown;
    this.qeditShown = false;
    this.qaddShown = false;
  }
  addQuestions() {
    if (this.eqSet.nativeElement.value.length <= 0 || this.q1.nativeElement.value.length <= 0
    || this.q2.nativeElement.value.length <= 0 || this.q2.nativeElement.value.length <= 0
    || this.q3.nativeElement.value.length <= 0 || this.q4.nativeElement.value.length <= 0 || this.q5.nativeElement.value.length <= 0) {
      alert('Fill all the questions');
    } else {
      alert('Questions added successfully');
    }

  }

  editQuestions() {
    if (this.eqSet.nativeElement.value.length <= 0) {
      alert('Select a question set you want to edit');
    } else {
      this.questionShow = ! this.questionShow;
      this.buttonShow = false;
    }
  }

  saveQuestions() {

  }

  delQuestions() {
    if (this.dqSet.nativeElement.value.length <= 0){
      alert('Select a question set');
    } else {
      alert('Questions under this Question Set deleted successfully');
    }

  }

}
