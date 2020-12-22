import {Directive, HostBinding} from '@angular/core';

@Directive({
  selector: '[appNavbarToggle]'
})
export class NavbarToggleDirective {
  @HostBinding('class.toggled') isActive = false;
  constructor() { }

}
