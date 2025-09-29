import { Injectable, signal } from '@angular/core';

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

@Injectable({
  providedIn: 'root',
})
export class ContextMenuService {
  // Estado del menú
  menuVisible = signal(false);
  menuX = signal(0);
  menuY = signal(0);
  selectedData = signal<any | null>(null);
  actions = signal<ContextMenuAction[]>([]);

  constructor() {
    document.addEventListener('click', (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (
        this.menuVisible() &&
        !target.closest('.context-row') &&
        !target.closest('app-constext-menu')
      ) {
        this.close();
      }
    });

    document.addEventListener('keydown', (event: KeyboardEvent) => {
      if (event.key === 'Escape' && this.menuVisible()) {
        this.close();
      }
    });
  }

  /** 👉 Mostrar menú en coordenadas X/Y con acciones y data */
  open(event: MouseEvent, data: any, actions: ContextMenuAction[]) {
    event.preventDefault();
    this.selectedData.set(data);
    this.actions.set(actions);

    const menuWidth = 180;
    const menuHeight = 120;
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    let x = event.clientX;
    let y = event.clientY;

    if (x + menuWidth > viewportWidth) {
      x = viewportWidth - menuWidth - 10;
    }
    if (y + menuHeight > viewportHeight) {
      y = viewportHeight - menuHeight - 10;
    }

    this.menuX.set(x);
    this.menuY.set(y);
    this.menuVisible.set(true);
  }

  /** 👉 Cerrar menú */
  close() {
    this.menuVisible.set(false);
  }
}
