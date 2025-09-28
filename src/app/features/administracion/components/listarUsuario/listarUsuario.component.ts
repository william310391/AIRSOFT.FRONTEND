import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  input,
  signal,
} from '@angular/core';
import { FindResponse } from 'src/app/core/models/usuario/response/find-response';
import { UsuarioResponse } from 'src/app/core/models/usuario/response/usuario-response';
import {
  ContextMenuAction,
  ConstextMenuComponent,
} from 'src/app/shared/components/constextMenu/constextMenu.component';

@Component({
  selector: 'app-listar-usuario',
  imports: [ConstextMenuComponent],
  templateUrl: './listarUsuario.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListarUsuarioComponent {
  datos = input.required<FindResponse<UsuarioResponse>>();

  menuVisible = signal(false);
  menuX = signal(0);
  menuY = signal(0);
  selectedUser = signal<any | null>(null);

  constructor(private elementRef: ElementRef) {}

  actions: ContextMenuAction[] = [
    { label: 'Editar', icon: 'bi bi-pencil', type: 'editar' },
    { label: 'Eliminar', icon: 'bi bi-trash', type: 'eliminar' },
    { label: 'Detalles', icon: 'bi bi-info-circle', type: 'detalle' },
  ];

  onRightClick(event: MouseEvent, user: any) {
    event.preventDefault();
    this.selectedUser.set(user);
    this.menuX.set(event.clientX);
    this.menuY.set(event.clientY);
    this.menuVisible.set(true);
  }

  // onGlobalClick() {
  //   this.menuVisible.set(false);
  // }

  /** 👉 Global Click */
  @HostListener('document:click', ['$event'])
  onGlobalClick(event: MouseEvent) {
    if (this.menuVisible() && !this.elementRef.nativeElement.contains(event.target)) {
      this.menuVisible.set(false);
    }
  }

  handleAction(event: { action: ContextMenuAction; data: any | null }) {
    switch (event.action.type) {
      case 'editar':
        console.log('Editar', event.data?.usuarioID);
        console.log('Editar', event.data);
        break;
      case 'eliminar':
        console.log('Eliminar', event.data?.usuarioID);
        break;
      case 'detalle':
        console.log('Detalle', event.data?.usuarioID);
        break;
    }
    this.menuVisible.set(false);
  }

  @HostListener('document:keydown.escape')
  onEscape() {
    this.menuVisible.set(false);
  }

  // menuVisible = signal(false);
  // menuX = signal(0);
  // menuY = signal(0);
  // selectedUser = signal<any | null>(null);

  // // 👇 Detecta clic derecho en una fila
  // onRightClick(event: MouseEvent, user: any) {
  //   event.preventDefault();
  //   this.selectedUser.set(user);
  //   this.menuX.set(event.clientX);
  //   this.menuY.set(event.clientY);
  //   this.menuVisible.set(true);
  // }

  // // 👇 Cierra el menú cuando se hace clic en cualquier parte
  // @HostListener('document:click')
  // closeMenu() {
  //   this.menuVisible.set(false);
  // }

  // editar() {
  //   const user = this.selectedUser(); // 👈 leer el valor del signal
  //   if (user) {
  //     alert(`Editar usuario con ID: ${user.usuarioID}`);
  //   }
  //   this.closeMenu();
  // }

  // eliminar() {
  //   const user = this.selectedUser();
  //   if (user) {
  //     alert(`Eliminar usuario con ID: ${user.usuarioID}`);
  //   }
  //   this.closeMenu();
  // }
}
