import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-datos-usuario',
  imports: [],
  templateUrl: './datos-usuario.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatosUsuarioComponent {
  authService = inject(AuthService);
}
