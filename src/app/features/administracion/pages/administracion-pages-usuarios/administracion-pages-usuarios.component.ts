import {
  ChangeDetectionStrategy,
  Component,
  computed,
  HostListener,
  inject,
  signal,
} from '@angular/core';
import { BuscarUsuariosComponent } from '../../components/buscarUsuarios/buscarUsuarios.component';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';
import { ModalService } from 'src/app/shared/services/modal.service';
import { ConstextMenuComponent } from 'src/app/shared/components/constextMenu/constextMenu.component';
import { ContextMenuService } from 'src/app/shared/services/contextMenu.service';
import { ContextMenuAction } from 'src/app/shared/interfaces/contextMenuAction';
import { GetRolResponse } from 'src/app/core/models/usuario/response/getRol-response';
import { UsuariosService } from '../../servicies/usuarios.service';
import { UsuarioRequest } from 'src/app/core/models/usuario/request/usuario-request';
import { AlertService } from 'src/app/shared/services/alert.service';

@Component({
  selector: 'app-administracion-pages-usuarios',
  imports: [BuscarUsuariosComponent, ModalComponent, ConstextMenuComponent],
  templateUrl: './administracion-pages-usuarios.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AdministracionPagesUsuariosComponent {
  constructor() {
    this.loadData();
  }

  modalService = inject(ModalService);
  contextMenu = inject(ContextMenuService);
  usuarioService = inject(UsuariosService);
  alertService = inject(AlertService);

  rol = signal<GetRolResponse[]>([]);
  menuId = signal<string>('menu1');
  // usuarioRequest = signal<UsuarioRequest>({} as UsuarioRequest);

  //Create Usuario
  usuarioCuenta = signal('');
  usuarioNombre = signal('');
  contrasena = signal('');
  contrasenaConfirmar = signal('');
  rolId = signal(0);

  // Computed signal con el objeto completo
  usuarioRequest = computed<UsuarioRequest>(() => ({
    usuarioCuenta: this.usuarioCuenta(),
    usuarioNombre: this.usuarioNombre(),
    contrasena: this.contrasena(),
    contrasenaConfirmar: this.contrasenaConfirmar(),
    rolId: this.rolId(),
  }));

  limpiarFormulario() {
    this.usuarioCuenta.set('');
    this.usuarioNombre.set('');
    this.contrasena.set('');
    this.contrasenaConfirmar.set('');
    this.rolId.set(0);
  }

  toNumber(value: string): number {
    return Number(value);
  }

  loadData() {
    this.usuarioService.getRol().subscribe({
      next: (res) => {
        if (res) {
          this.rol.set(res);
        }
      },
    });
  }

  //modal
  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

  //constext menu
  actions: ContextMenuAction[] = [
    { label: 'Nuevo', icon: 'bi bi-pencil', type: 'nuevo' },
    { label: 'Editar', icon: 'bi bi-pencil', type: 'editar', disabled: false },
    { label: 'Eliminar', icon: 'bi bi-trash', type: 'eliminar' },
    { label: 'Detalles', icon: 'bi bi-info-circle', type: 'detalle' },
  ];

  @HostListener('document:contextmenu', ['$event'])
  handleRightClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const fila = target.closest('.context-row');
    if (fila) {
      event.preventDefault();

      const data = {
        usuarioID: fila.querySelector('#hd_usuarioID')?.getAttribute('value'),
        usuarioCuenta: fila.querySelector('#hd_usuarioCuenta')?.getAttribute('value'),
        usuarioNombre: fila.querySelector('#hd_usuarioNombre')?.getAttribute('value'),
        rolID: fila.querySelector('#hd_rolID')?.getAttribute('value'),
        activo: fila.querySelector('#hd_activo')?.getAttribute('value'),
      };
      this.contextMenu.open(this.menuId(), event, data, this.actions);
    }
  }
  //acciones del context menu
  handleAction(event: { action: ContextMenuAction; data: any | null }) {
    switch (event.action.type) {
      case 'nuevo':
        // console.log(event.data);
        // console.log('nuevo', event.data?.usuarioID);
        this.limpiarFormulario();
        this.openModal('userModal');
        break;
      case 'editar':
        // console.log(event.data);
        // console.log('Editar', event.data?.usuarioID);
        break;
      case 'eliminar':
        // console.log('Eliminar', event.data?.usuarioID);
        break;
      case 'detalle':
        // console.log('Detalle', event.data?.usuarioID);
        break;
    }
    this.contextMenu.close(this.menuId());
  }

  onclickCreate() {
    // El UsuarioRequest computed ya tiene todos los valores actualizados

    this.usuarioService.create(this.usuarioRequest()).subscribe({
      next: () => {
        this.alertService.alert({
          icon: 'success',
          title: '¡Éxito!',
          text: 'Usuario creado correctamente',
        });
        this.limpiarFormulario();
        this.closeModal('userModal');
      },
      error: () => {
        // console.log('hay error');
        // El error ya fue manejado en el servicio centralizado
        // this.alertService.alert({
        //   icon: 'error',
        //   title: '¡Error!',
        //   text: err.error.Message,
        // });
      },
    });

    // this.usuarioService.create(this.usuarioRequest()).subscribe({
    //   next: () => {
    //     this.alertService.alert({
    //       icon: 'success',
    //       title: '¡Éxito!',
    //       text: 'Usuario creado correctamente',
    //     });
    //     this.limpiarFormulario();
    //     this.closeModal('userModal');
    //   },
    //   error: (err) => {
    //     // console.error('Error al crear usuario', err);
    //     console.log(err);
    //     // this.alertService.alert({
    //     //   icon: 'error',
    //     //   title: '¡Error!',
    //     //   text: err.error.Message,
    //     // });
    //   },
    // });
  }
}
