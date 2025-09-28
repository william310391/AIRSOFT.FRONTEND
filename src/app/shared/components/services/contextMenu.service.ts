import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ContextMenuService {
  constructor() {}

  menuVisible = signal(false);
  menuX = signal(0);
  menuY = signal(0);

  onRightClick(event: MouseEvent) {
    event.preventDefault();
    this.menuX.set(event.clientX);
    this.menuY.set(event.clientY);
    this.menuVisible.set(true);
  }

  onGlobalClick() {
    this.menuVisible.set(false);
  }
}
