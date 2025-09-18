import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import DatosUsuarioComponent from '../datos-usuario/datos-usuario.component';
import NavigationMenuComponent from '../navigation-menu/navigation-menu.component';
import { AuthService } from 'src/app/features/auth/pages/services/auth.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar-desk',
  imports: [NavigationMenuComponent, DatosUsuarioComponent, RouterLink],
  templateUrl: './navbar-desk.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class NavbarDeskComponent {
  authService = inject(AuthService);
}
