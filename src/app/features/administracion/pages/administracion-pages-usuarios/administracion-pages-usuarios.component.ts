import {
  ChangeDetectionStrategy,
  Component,
  computed,
  HostListener,
  inject,
  signal,
  ViewChild,
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
import { UsuarioDeleteRequest } from 'src/app/core/models/usuario/request/usuarioDelete-request';
import { UsuarioChangeStateRequest } from 'src/app/core/models/usuario/request/usuarioChangeState-request';

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

  @ViewChild(BuscarUsuariosComponent) buscarComponent!: BuscarUsuariosComponent;

  modalService = inject(ModalService);
  contextMenu = inject(ContextMenuService);
  usuarioService = inject(UsuariosService);
  alertService = inject(AlertService);

  rol = signal<GetRolResponse[]>([]);
  menuId = signal<string>('menu1');
  isCreate = signal<boolean>(true);
  // usuarioRequest = signal<UsuarioRequest>({} as UsuarioRequest);

  //Create Usuario
  usuarioID = signal(0);
  usuarioCuenta = signal('');
  usuarioNombre = signal('');
  contrasena = signal('');
  contrasenaConfirmar = signal('');
  rolId = signal(0);

  // Computed signal con el objeto completo
  usuarioRequest = computed<UsuarioRequest>(() => ({
    usuarioID: this.usuarioID(),
    usuarioCuenta: this.usuarioCuenta(),
    usuarioNombre: this.usuarioNombre(),
    contrasena: this.contrasena(),
    contrasenaConfirmar: this.contrasenaConfirmar(),
    rolId: this.rolId(),
  }));

  deleteUsuarioRequest = computed<UsuarioDeleteRequest>(() => ({
    usuarioID: this.usuarioID(),
  }));

  changeStateUsuarioRequest = computed<UsuarioChangeStateRequest>(() => ({
    usuarioID: this.usuarioID(),
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
    { label: 'Nuevo', icon: 'bi bi-file-earmark-plus', type: 'nuevo' },
    { label: 'Editar', icon: 'bi bi-pencil', type: 'editar' },
    { label: 'Cambiar Estado', icon: 'bi bi-arrow-repeat', type: 'Cambiar_estado' },
    { label: 'Eliminar', icon: 'bi bi-trash', type: 'eliminar' },
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
    this.usuarioID.set(event.data?.usuarioID);
    this.usuarioCuenta.set(event.data?.usuarioCuenta);
    this.usuarioCuenta.set(event.data?.usuarioCuenta);
    this.usuarioNombre.set(event.data?.usuarioNombre);
    this.rolId.set(event.data?.rolID);
    switch (event.action.type) {
      case 'nuevo':
        this.limpiarFormulario();
        this.openModal('userModal');
        this.isCreate.set(true);
        break;
      case 'editar':
        this.isCreate.set(false);
        this.openModal('userModal');
        break;
      case 'Cambiar_estado':
        this.changeStateUsuario();
        break;
      case 'eliminar':
        this.deleteUsuario();
        break;
    }
    this.contextMenu.close(this.menuId());
  }

  onclickGuardarCambios() {
    this.usuarioService.ProcesarUsuario(this.usuarioRequest(), this.isCreate()).subscribe({
      next: () => {
        this.alertService.alert({
          icon: 'success',
          title: '¡Éxito!',
          text: this.isCreate()
            ? 'Usuario creado correctamente'
            : 'Usuario Actualizado Correctamente',
        });

        this.limpiarFormulario();
        this.closeModal('userModal');
        this.buscarComponent.buscarUsuarios();
      },
    });
  }

  deleteUsuario() {
    this.alertService.confirm({
      title: 'Estas seguro?',
      text: '!De eliminar el usuario!',
      confirmButtonText: 'Si, Eliminarlo',
      fnConfirm: () => {
        this.usuarioService.DeleteUsuario(this.deleteUsuarioRequest()).subscribe({
          next: () => {
            this.alertService.alert({
              icon: 'success',
              title: '¡Éxito!',
              text: 'Usuario Eliminado',
            });
            this.buscarComponent.buscarUsuarios();
          },
        });
      },
    });
  }
  changeStateUsuario() {
    this.usuarioService.ChangeState(this.changeStateUsuarioRequest()).subscribe({
      next: () => {
        this.alertService.alert({
          icon: 'success',
          title: '¡Éxito!',
          text: 'Usuario Cambio de Estado',
        });
        this.buscarComponent.buscarUsuarios();
      },
    });
  }
}
