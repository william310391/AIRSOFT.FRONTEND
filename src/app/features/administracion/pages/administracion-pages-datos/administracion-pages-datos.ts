import { Component, computed, HostListener, inject, signal, ViewChild } from '@angular/core';
import { DatosService } from '../../servicies/datos.service';
import { LoadingService } from '@shared/services/loading.service';
import { BuscarDatos } from '../../components/buscarDatos/buscarDatos.component';
import { ModalComponent } from '@shared/components/modal/modal.component';
import { ModalService } from '@shared/services/modal.service';
import { AlertService } from '@shared/services/alert.service';
import { ContextMenuAction } from '@shared/interfaces/contextMenuAction';
import { ContextMenuService } from '@shared/services/contextMenu.service';
import { ConstextMenuComponent } from '@shared/components/constextMenu/constextMenu.component';
import { DatosChangeStateRequest } from '@core/models/datos/request/datosChangeState-request';

@Component({
  selector: 'app-administracion-pages-datos',
  templateUrl: './administracion-pages-datos.html',
  imports: [BuscarDatos, ModalComponent, ConstextMenuComponent],
})
export default class AdministracionPagesDatos {
  @ViewChild(BuscarDatos) buscarComponent!: BuscarDatos;

  datosService = inject(DatosService);
  sharedService = inject(LoadingService);
  modalService = inject(ModalService);
  contextMenu = inject(ContextMenuService);
  alertService = inject(AlertService);

  menuId = signal<string>('menuDatos');
  modal = signal<string>('modaloDatos');
  isCreate = signal<boolean>(true);

  //Crear Datos
  datoID = signal<number>(0);
  tipodato = signal<string>('');
  datoNombre = signal<string>('');
  datoValor = signal<string>('');

  //modal
  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

  limpiarFormulario() {
    this.tipodato.set('');
    this.datoID.set(0);
    this.datoNombre.set('');
    this.datoValor.set('');
    // this.activo.set(0);
  }

  datosRequest = computed(() => ({
    tipoDato: this.tipodato(),
    datoID: this.datoID(),
    datoNombre: this.datoNombre(),
    datoValor: this.datoValor(),
    activo: true,
  }));

  changeStateDatosRequest = computed<DatosChangeStateRequest>(() => ({
    datoID: this.datoID(),
  }));

  CrearDatos = () => {
    console.log('CrearDatos');
    this.limpiarFormulario();
    this.openModal(this.modal());
    this.isCreate.set(true);
  };

  onclickGuardarCambios() {
    console.log('onclickGuardarCambios');
    this.datosService.ProcesarDato(this.datosRequest(), this.isCreate()).subscribe({
      next: () => {
        this.alertService.alert({
          icon: 'success',
          title: '¡Éxito!',
          text: this.isCreate()
            ? 'Usuario creado correctamente'
            : 'Usuario Actualizado Correctamente',
        });
        this.limpiarFormulario();
        this.closeModal(this.modal());
        this.buscarComponent.onBuscar();
      },
      error: (error) => {
        console.error('Error al guardar los datos', error);
      },
    });
  }

  //constext menu
  actions: ContextMenuAction[] = [
    { label: 'Nuevo', icon: 'bi bi-file-earmark-plus', type: 'nuevo' },
    { label: 'Editar', icon: 'bi bi-pencil', type: 'editar' },
    { label: 'Cambiar Estado', icon: 'bi bi-arrow-repeat', type: 'Cambiar_estado' },
  ];

  @HostListener('document:contextmenu', ['$event'])
  handleRightClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const fila = target.closest('.context-row');
    if (fila) {
      event.preventDefault();

      const data = {
        datoID: fila.querySelector('#hd_datoID')?.getAttribute('value'),
        tipoDato: fila.querySelector('#hd_tipoDato')?.getAttribute('value'),
        datoValor: fila.querySelector('#hd_datoValor')?.getAttribute('value'),
        datoNombre: fila.querySelector('#hd_datoNombre')?.getAttribute('value'),
      };
      this.contextMenu.open(this.menuId(), event, data, this.actions);
    }
  }

  handleAction(event: { action: ContextMenuAction; data: any | null }) {
    // console.log('handleAction', event.data);
    this.datoID.set(event.data?.datoID);
    this.tipodato.set(event.data?.tipoDato);
    this.datoValor.set(event.data?.datoValor);
    this.datoNombre.set(event.data?.datoNombre);
    switch (event.action.type) {
      case 'nuevo':
        this.limpiarFormulario();
        this.openModal(this.modal());
        this.isCreate.set(true);
        break;
      case 'editar':
        this.isCreate.set(false);
        this.openModal(this.modal());
        break;
      case 'Cambiar_estado':
        this.changeStateUsuario();
        break;
    }
    this.contextMenu.close(this.menuId());
  }

  changeStateUsuario() {
    this.datosService.changeState(this.changeStateDatosRequest()).subscribe({
      next: () => {
        this.alertService.alert({
          icon: 'success',
          title: '¡Éxito!',
          text: 'Se cambio de estado al dato correctamente',
        });
        this.buscarComponent.onBuscar();
      },
    });
  }
}
