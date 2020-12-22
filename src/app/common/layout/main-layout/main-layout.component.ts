import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css']
})
export class MainLayoutComponent implements OnInit {
  isToggled = false;

  constructor() {
    if (window.innerWidth < 500){
      this.isToggled = true;
    }
  }

  ngOnInit(): void {
  }

}
