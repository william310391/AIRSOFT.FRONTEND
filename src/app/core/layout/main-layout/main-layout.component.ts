import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import NavbarMovilComponent from './navbar-movil/navbar-movil.component';
import NavbarDeskComponent from './navbar-desk/navbar-desk.component';
@Component({
  selector: 'app-main-layout',
  imports: [RouterOutlet, NavbarMovilComponent, NavbarDeskComponent],
  templateUrl: './main-layout.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class MainLayoutComponent {}
