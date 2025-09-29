import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  inject,
  input,
  signal,
} from '@angular/core';
import { FindResponse } from 'src/app/core/models/usuario/response/find-response';
import { UsuarioResponse } from 'src/app/core/models/usuario/response/usuario-response';
import { ConstextMenuComponent } from 'src/app/shared/components/constextMenu/constextMenu.component';
import {
  ContextMenuAction,
  ContextMenuService,
} from 'src/app/shared/components/services/contextMenu.service';

@Component({
  selector: 'app-listar-usuario',
  imports: [ConstextMenuComponent],
  templateUrl: './listarUsuario.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListarUsuarioComponent {
  contextMenu = inject(ContextMenuService);
  datos = input.required<FindResponse<UsuarioResponse>>();

  menuVisible = signal(false);
  menuX = signal(0);
  menuY = signal(0);
  selectedUser = signal<any | null>(null);

  //opciones constext menu
  actions: ContextMenuAction[] = [
    { label: 'Editar', icon: 'bi bi-pencil', type: 'editar' },
    { label: 'Eliminar', icon: 'bi bi-trash', type: 'eliminar' },
    { label: 'Detalles', icon: 'bi bi-info-circle', type: 'detalle' },
  ];
  //acciones del context menu
  handleAction(event: { action: ContextMenuAction; data: any | null }) {
    switch (event.action.type) {
      case 'editar':
        console.log('Editar', event.data?.usuarioID);
        break;
      case 'eliminar':
        console.log('Eliminar', event.data?.usuarioID);
        break;
      case 'detalle':
        console.log('Detalle', event.data?.usuarioID);
        break;
    }
    this.contextMenu.close();
  }

  onRightClick(event: MouseEvent, user: any) {
    this.contextMenu.open(event, user, this.actions);
  }
}
