import { Component, inject, input, signal } from '@angular/core';
import { FindResponse } from 'src/app/core/models/usuario/response/find-response';
import { UsuarioResponse } from 'src/app/core/models/usuario/response/usuario-response';
import { ConstextMenuComponent } from 'src/app/shared/components/constextMenu/constextMenu.component';
import { ContextMenuService } from 'src/app/shared/services/contextMenu.service';
import { ModalService } from 'src/app/shared/services/modal.service';
import { ContextMenuAction } from 'src/app/shared/interfaces/contextMenuAction';

@Component({
  selector: 'app-listar-usuario',
  templateUrl: './listarUsuario.component.html',
})
export class ListarUsuarioComponent {
  datos = input.required<FindResponse<UsuarioResponse>>();
  modalService = inject(ModalService);

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }
}
