import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {FormGroup, NgForm} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  @ViewChild('name', {static: false}) name: ElementRef;
  @ViewChild('password', {static: false}) password: ElementRef;
  lname: any;
  lpassword: any;
  constructor(private router: Router) { }

  ngOnInit() {
  }

  onFormSubmit(form: NgForm) {
  }
  login() {
    this.lname = this.name.nativeElement.value;
    this.lpassword = this.password.nativeElement.value;
    var name = localStorage.getItem('name');
    var pass = localStorage.getItem('password');
    if(this.lname === 'org' && this.lpassword === 'org') {
      this.router.navigate(['/l-dashboard']);
    } else if (this.lname === 'global' && this.lpassword === 'global') {
      this.router.navigate(['/g-dashboard']);
    } else if (this.lname === 'prof' && this.lpassword === 'prof') {
      this.router.navigate(['/prof-dashboard']);
    } else {
      alert('Invalid Credentials');
    }
  }

  register() {
    this.router.navigate(['/register']);
  }

}
