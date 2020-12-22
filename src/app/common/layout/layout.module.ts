import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {MainLayoutComponent} from './main-layout/main-layout.component';
import {FooterComponent} from './footer/footer.component';
import {FooterOnlyLayoutComponent} from './footer-only-layout/footer-only-layout.component';
import {NavbarStudentComponent} from './navbar-student/navbar-student.component';
import {NavbarTeacherComponent} from './navbar-teacher/navbar-teacher.component';
import {HeaderComponent} from './header/header.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';


@NgModule({
  declarations: [
    MainLayoutComponent,
    FooterOnlyLayoutComponent,
    FooterComponent,
    NavbarStudentComponent,
    NavbarTeacherComponent,
    HeaderComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([]),
    FontAwesomeModule
  ],
  exports: [MainLayoutComponent, FooterOnlyLayoutComponent]
})
export class LayoutModule {
}
