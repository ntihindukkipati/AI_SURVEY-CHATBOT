import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HeaderComponent} from './header/header.component';
import {HttpClientModule} from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { GDashboardComponent } from './g-dashboard/g-dashboard.component';
import { LDashboardComponent } from './l-dashboard/l-dashboard.component';
import { ProfDashboardComponent } from './prof-dashboard/prof-dashboard.component';
import {MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatMenuModule, MatRadioModule} from '@angular/material';
import { QuestionsComponent } from './questions/questions.component';
import {MatDialogModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Routes} from '@angular/router';


const appRoutes: Routes = [
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    RegistrationComponent,
    GDashboardComponent,
    LDashboardComponent,
    ProfDashboardComponent,
    QuestionsComponent


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatMenuModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    MatRadioModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [QuestionsComponent]
})
export class AppModule { }
