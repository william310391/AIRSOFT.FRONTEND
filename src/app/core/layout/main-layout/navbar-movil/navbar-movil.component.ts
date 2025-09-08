import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { LayoutService } from 'src/app/core/layout/services/layout.service';
import DatosUsuarioComponent from '../datos-usuario/datos-usuario.component';
import NavigationMenuComponent from '../navigation-menu/navigation-menu.component';

@Component({
  selector: 'app-navbar-movil',
  imports: [NavigationMenuComponent, DatosUsuarioComponent],
  templateUrl: './navbar-movil.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class NavbarMovilComponent {
  authService = inject(LayoutService);
}
