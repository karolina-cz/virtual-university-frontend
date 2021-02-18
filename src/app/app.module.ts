import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NavbarToggleDirective } from './directives/navbar-toggle.directive';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {LayoutModule} from './common/layout/layout.module';
import {PasswordChangeModule} from './components/password-change/password-change.module';
import {LoginModule} from './components/login/login.module';
import {HomeModule} from './components/home/home.module';
import {TeamsModule} from './components/teams/teams.module';
import {ProfileModule} from './components/profile/profile.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import {registerLocaleData} from '@angular/common';
import localePl from '@angular/common/locales/pl';
import { EventFreqPipe } from './core/pipes/event-freq.pipe';
import { DayofweekPipe } from './core/pipes/dayofweek.pipe';

registerLocaleData(localePl);


@NgModule({
  declarations: [
    AppComponent,
    NavbarToggleDirective
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    NgbModule,
    FormsModule,
    LayoutModule,
    PasswordChangeModule,
    LoginModule,
    HomeModule,
    TeamsModule,
    ProfileModule,
    BrowserAnimationsModule,
    CalendarModule.forRoot({provide: DateAdapter, useFactory: adapterFactory})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
