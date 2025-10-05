import { Injectable, signal, WritableSignal } from '@angular/core';
import { ContextMenuAction } from '../interfaces/contextMenuAction';
export interface ContextMenuState {
  menuVisible: boolean;
  menuX: number;
  menuY: number;
  contextData: any;
  actions: ContextMenuAction[];
}

@Injectable({ providedIn: 'root' })
export class ContextMenuService {
  // Guardamos un registro de menús por ID
  private menus: WritableSignal<Record<string, ContextMenuState>> = signal({});

  constructor() {
    // Cerrar menú al hacer clic fuera
    document.addEventListener('click', (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      Object.keys(this.menus()).forEach((id) => {
        const menu = this.menus()[id];
        if (
          menu.menuVisible &&
          !target.closest('.context-row') && // tu fila/elemento
          !target.closest(`app-constext-menu[id="${id}"]`)
        ) {
          this.close(id);
        }
      });
    });

    // Cerrar menú al presionar Escape
    document.addEventListener('keydown', (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        Object.keys(this.menus()).forEach((id) => this.close(id));
      }
    });
  }

  open(id: string, event: MouseEvent, data: any, actions: ContextMenuAction[]) {
    event.preventDefault();

    const menuWidth = 180;
    const menuHeight = 120;
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    let x = event.clientX;
    let y = event.clientY;

    if (x + menuWidth > viewportWidth) x = viewportWidth - menuWidth - 10;
    if (y + menuHeight > viewportHeight) y = viewportHeight - menuHeight - 10;

    // ✅ Usando .update() en lugar de mutate()
    this.menus.update((m) => ({
      ...m,
      [id]: { menuVisible: true, menuX: x, menuY: y, contextData: data, actions },
    }));
  }

  close(id: string) {
    this.menus.update((m) => ({
      ...m,
      [id]: m[id] ? { ...m[id], menuVisible: false } : m[id],
    }));
  }

  getMenu(id: string): ContextMenuState {
    return (
      this.menus()[id] || { menuVisible: false, menuX: 0, menuY: 0, contextData: null, actions: [] }
    );
  }
}
