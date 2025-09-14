import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import DatosUsuarioComponent from '../datos-usuario/datos-usuario.component';
import NavigationMenuComponent from '../navigation-menu/navigation-menu.component';
import { AuthService } from 'src/app/features/auth/pages/services/auth.service';

@Component({
  selector: 'app-navbar-movil',
  imports: [NavigationMenuComponent, DatosUsuarioComponent],
  templateUrl: './navbar-movil.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class NavbarMovilComponent {
  authService = inject(AuthService);
}
