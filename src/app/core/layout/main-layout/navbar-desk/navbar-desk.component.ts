import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { AuthService } from 'src/app/core/layout/services/layout.service';
import DatosUsuarioComponent from '../datos-usuario/datos-usuario.component';
import NavigationMenuComponent from '../navigation-menu/navigation-menu.component';

@Component({
  selector: 'app-navbar-desk',
  imports: [NavigationMenuComponent, DatosUsuarioComponent],
  templateUrl: './navbar-desk.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class NavbarDeskComponent {
  authService = inject(AuthService);
}
