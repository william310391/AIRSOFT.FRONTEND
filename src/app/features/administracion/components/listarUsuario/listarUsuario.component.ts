import { Component, inject, input, signal } from '@angular/core';
import { FindResponse } from '@core/models/usuario/response/find-response';
import { UsuarioResponse } from '@core/models/usuario/response/usuario-response';
import { ModalService } from '@shared/services/modal.service';

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
