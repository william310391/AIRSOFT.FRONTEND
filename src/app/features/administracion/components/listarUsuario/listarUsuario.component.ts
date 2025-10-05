import { Component, inject, input, signal } from '@angular/core';
import { FindResponse } from 'src/app/core/models/usuario/response/find-response';
import { UsuarioResponse } from 'src/app/core/models/usuario/response/usuario-response';
import { ConstextMenuComponent } from 'src/app/shared/components/constextMenu/constextMenu.component';
import { ContextMenuService } from 'src/app/shared/services/contextMenu.service';
import { ModalService } from 'src/app/shared/services/modal.service';
import { ContextMenuAction } from 'src/app/shared/interfaces/contextMenuAction';

@Component({
  selector: 'app-listar-usuario',
  imports: [ConstextMenuComponent],
  templateUrl: './listarUsuario.component.html',
})
export class ListarUsuarioComponent {
  datos = input.required<FindResponse<UsuarioResponse>>();

  contextMenu = inject(ContextMenuService);
  modalService = inject(ModalService);

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
        console.log(event.data);
        console.log('Editar', event.data?.usuarioID);
        // this.openModal();
        this.openModal('userModal2');
        break;
      case 'eliminar':
        console.log('Eliminar', event.data?.usuarioID);
        break;
      case 'detalle':
        console.log('Detalle', event.data?.usuarioID);
        break;
    }
    this.contextMenu.close('menu1');
  }

  onRightClick(event: MouseEvent, user: any) {
    this.contextMenu.open('menu1', event, user, this.actions);
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }
}
