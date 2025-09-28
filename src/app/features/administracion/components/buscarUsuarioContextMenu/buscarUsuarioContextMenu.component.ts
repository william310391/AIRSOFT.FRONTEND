import { Component, EventEmitter, input, output } from '@angular/core';

@Component({
  selector: 'app-buscar-usuario-context-menu',
  imports: [],
  templateUrl: './buscarUsuarioContextMenu.component.html',
})
export class BuscarUsuarioContextMenuComponent {
  menuY = input.required<number>();
  menuX = input.required<number>();
  menuVisible = input.required<boolean>();
  editar = output<void>();
  eliminar = output<void>();
}
