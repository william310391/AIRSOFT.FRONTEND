import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

export interface ContextMenuAction {
  /** identificador único para saber qué hacer */
  type: string;

  /** texto visible en el menú */
  label: string;

  /** opcional: clase de icono (ej: Bootstrap, FontAwesome, etc.) */
  icon?: string;

  /** opcional: si quieres deshabilitar acciones en ciertos casos */
  disabled?: boolean;
}

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
