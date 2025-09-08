import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DatosUsuarioComponent } from '../datos-usuario/datos-usuario.component';
import { AuthService } from 'src/app/core/services/auth.service';
import { NavbarMenuComponent } from '../navbar-menu/navbar-menu.component';

@Component({
  selector: 'dashboard-navbar-movil',
  imports: [DatosUsuarioComponent, NavbarMenuComponent],
  templateUrl: './navbar-movil.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarMovilComponent {
  authService = inject(AuthService);
}
