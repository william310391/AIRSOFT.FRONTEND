import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DatosUsuarioComponent } from '../datos-usuario/datos-usuario.component';
import { AuthService } from 'src/app/core/services/auth.service';
import { NavbarMenuComponent } from '../navbar-menu/navbar-menu.component';
@Component({
  selector: 'dashboard-navbar',
  imports: [DatosUsuarioComponent, NavbarMenuComponent],
  templateUrl: './navbar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {
  authService = inject(AuthService);
}
