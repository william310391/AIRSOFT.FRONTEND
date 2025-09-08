import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { LayoutService } from 'src/app/core/layout/services/layout.service';

@Component({
  selector: 'app-datos-usuario',
  imports: [],
  templateUrl: './datos-usuario.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class DatosUsuarioComponent {
  authService = inject(LayoutService);
}
