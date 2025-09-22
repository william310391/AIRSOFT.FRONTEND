import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import NavbarMovilComponent from './navbar-movil/navbar-movil.component';
import NavbarDeskComponent from './navbar-desk/navbar-desk.component';
import { LoadingComponent } from 'src/app/shared/loading/loading.component';
@Component({
  selector: 'app-main-layout',
  imports: [RouterOutlet, NavbarMovilComponent, NavbarDeskComponent, LoadingComponent],
  templateUrl: './main-layout.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class MainLayoutComponent {}
