import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private modals = signal<Record<string, boolean>>({});

  // 👉 Estado reactivo del modal
  isVisible(id: string) {
    return !!this.modals()[id];
  }

  // 👉 Abrir modal
  open(id: string) {
    this.modals.update((state) => ({ ...state, [id]: true }));
  }

  // 👉 Cerrar modal
  close(id: string) {
    this.modals.update((state) => ({ ...state, [id]: false }));
  }

  // 👉 Toggle modal
  toggle(id: string) {
    this.isVisible(id) ? this.close(id) : this.open(id);
  }
}
