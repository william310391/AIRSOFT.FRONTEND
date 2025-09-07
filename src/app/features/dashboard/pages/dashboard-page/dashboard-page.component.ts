import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { NavbarMovilComponent } from '../../components/navbar-movil/navbar-movil.component';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-dashboard-page',
  imports: [RouterOutlet, NavbarComponent, NavbarMovilComponent],
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.css',
})
export default class DashboardPageComponent {
  authService = inject(AuthService);
}
