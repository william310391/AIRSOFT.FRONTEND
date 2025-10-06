import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { BuscarUsuariosComponent } from '../../components/buscarUsuarios/buscarUsuarios.component';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';
import { ModalService } from 'src/app/shared/services/modal.service';

@Component({
  selector: 'app-administracion-pages-usuarios',
  imports: [BuscarUsuariosComponent, ModalComponent],
  templateUrl: './administracion-pages-usuarios.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AdministracionPagesUsuariosComponent {
  private modalService = inject(ModalService);

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }
}
