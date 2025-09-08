import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { LayoutService } from '../../services/layout.service';

@Component({
  selector: 'app-navigation-menu',
  imports: [],
  templateUrl: './navigation-menu.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class NavigationMenuComponent {
  servicio = inject(LayoutService);
}
