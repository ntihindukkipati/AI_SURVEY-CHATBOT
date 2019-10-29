import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {ApiService} from '../api.service';

@Component({
  selector: 'app-g-dashboard',
  templateUrl: './g-dashboard.component.html',
  styleUrls: ['./g-dashboard.component.css']
})
export class GDashboardComponent implements OnInit {
  addOrgForm: FormGroup;
  @ViewChild('orgName', {static: false}) orgName: ElementRef;
  @ViewChild('city', {static: false}) city: ElementRef;
  @ViewChild('state', {static: false}) state: ElementRef;
  @ViewChild('zip', {static: false}) zip: ElementRef;
  @ViewChild('dorgName', {static: false}) dorgName: ElementRef;
  addShown: boolean = false;
  editShown: boolean = false;
  delShown: boolean = false;
  showOrg: boolean = false;
  showButton: boolean = true;
  oName: any;
  delOrgName: any;
  ocity: any;
  ostate: any;
  ozip: any;
  editOrgForm: FormGroup;
  updatedOrg = {};
  orgDet : any;
  takeSelected: string;
  delSelected: string;
  constructor(private router: Router, private api: ApiService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.addOrgForm = this.formBuilder.group({
      'g_orgName': [null, Validators.required],
      'g_city': [null, Validators.required],
      'g_state': [null, Validators.required],
      'g_zip': [null, Validators.required]
    });

    this.editOrgForm = this.formBuilder.group({
      'eorgName': [null, Validators.required],
      'e_city': [null, Validators.required],
      'e_state': [null, Validators.required],
      'e_zip': [null, Validators.required]
    });
  }

  onFormSubmit(form: NgForm) {

  }

  showAddOrg() {
    this.addShown = ! this.addShown;
    this.editShown = false;
    this.delShown = false;
  }
  showEditOrg() {
    this.editShown = ! this.editShown;
    this.addShown = false;
    this.delShown = false;
  }
  showDelOrg() {
    this.delShown = ! this.delShown;
    this.editShown = false;
    this.addShown = false;
  }
  addOrg(addForm) {
    this.oName = this.orgName.nativeElement.value;
    this.ocity = this.city.nativeElement.value;
    this.ostate = this.state.nativeElement.value;
    this.ozip = this.zip.nativeElement.value;
    if (this.oName.length <= 0 || this.ocity.length <= 0 || this.ostate.length <= 0 || this.ozip.length <= 0 ) {
      alert('Please fill all the fields');
    } else {
      console.log('orgName:' + this.oName);
      alert('item added successfully');
    }
    console.log("in submit method")
    this.api.addGlobalOrg(addForm)
      .subscribe(res => {
        let id = res['_id'];
        this.router.navigate(['/g-dashboard', id]);
      }, (err) => {
        console.log(err);
      });
  }

  getSelected(selectedValue:string){
    console.log('value is ',selectedValue);
    this.takeSelected = selectedValue;
    this.api.getGlobalOrgs(selectedValue)
      .subscribe(res => {
       /* let id = res['_id'];
        this.router.navigate(['/g-dashboard', id]);*/
       console.log(res);
       this.orgDet = res;
      }, (err) => {
        console.log(err);
      });
  }

  editOrg(){
    this.showOrg = ! this.showOrg;
    this.showButton = false;
  }


  saveOrganisation(editForm) {
    alert("Organisation saved successfully");
    this.showOrg = false;
    this.showButton = true;
    console.log("form",editForm);
    console.log("value", this.takeSelected);
    this.api.updateGlobalOrgs(this.takeSelected, this.orgDet)
      .subscribe(res => {
        console.log(res);
        this.updatedOrg = res;
      }, (err) => {
        console.log(err);
      });

  }
  deleteSelected(delSel: string){
    this.delSelected = delSel;
  }


  delOrg() {
    /*this.delOrgName = this.dorgName.nativeElement.value;*/
    console.log('deleted' + this.delSelected);
    this.api.deleteGlobalOrg(this.delSelected)
      .subscribe(res => {
        console.log(res);
        this.updatedOrg = res;
      }, (err) => {
        console.log(err);
      });
    alert('Deleted Successfully');
  }

}
