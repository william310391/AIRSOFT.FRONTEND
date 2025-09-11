import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { LayoutService } from '../../services/layout.service';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navigation-menu',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navigation-menu.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class NavigationMenuComponent {
  servicio = inject(LayoutService);
}
