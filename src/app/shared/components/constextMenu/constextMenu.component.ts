import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { ContextMenuAction } from '../services/contextMenu.service';

@Component({
  selector: 'app-constext-menu',
  imports: [],
  templateUrl: './constextMenu.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConstextMenuComponent {
  menuVisible = input.required<boolean>();
  menuX = input.required<number>();
  menuY = input.required<number>();
  actions = input.required<ContextMenuAction[]>();
  contextData = input<any | null>(); // usuario o fila pasada por el padre
  // output que emite { action, data }
  actionSelected = output<{ action: ContextMenuAction; data: any | null }>();
}
