import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DatosUsuarioComponent } from '../datos-usuario/datos-usuario.component';
import { AuthService } from 'src/app/core/services/auth.service';
@Component({
  selector: 'dashboard-navbar',
  imports: [DatosUsuarioComponent],
  templateUrl: './navbar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {
  authService = inject(AuthService);
}
