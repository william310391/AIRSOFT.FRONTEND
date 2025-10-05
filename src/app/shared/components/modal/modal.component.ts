import {
  Component,
  effect,
  AfterViewInit,
  EnvironmentInjector,
  runInInjectionContext,
  inject,
  input,
  model,
} from '@angular/core';
import { Modal } from 'bootstrap';

@Component({
  selector: 'app-modal',
  standalone: true,
  templateUrl: './modal.component.html',
})
export class ModalComponent implements AfterViewInit {
  // @Input() modalId = 'defaultModal';
  //  @Input() visible = signal(false);

  modalId = input('defaultModal'); // 👈 Input reactivo tipo signal
  visible = model<boolean>(false); // 👈 Input reactivo tipo signal

  private modalRef!: Modal;
  private injector = inject(EnvironmentInjector);

  ngAfterViewInit() {
    const modalElement = document.getElementById(this.modalId());

    if (modalElement) {
      this.modalRef = new Modal(modalElement, {
        backdrop: true,
        keyboard: true,
        focus: true, // 👈 Bootstrap se encarga de mover el foco al abrir
      });

      // Cuando se cierra manualmente, sincroniza el signal
      modalElement.addEventListener('hidden.bs.modal', () => {
        this.visible.set(false);

        // 👇 Importante: asegurarse que ningún hijo del modal quede con foco
        (document.activeElement as HTMLElement)?.blur();
      });

      // Cuando se abre, mover foco al primer input/botón disponible
      modalElement.addEventListener('shown.bs.modal', () => {
        // Busca el primer input, select o botón, ignorando la X de cerrar
        const focusable = modalElement.querySelector<HTMLElement>(
          'input, select, textarea, button:not(.btn-close), [tabindex]:not([tabindex="-1"])'
        );
        focusable?.focus();
      });

      // Reactividad: abre/cierra con signal
      runInInjectionContext(this.injector, () => {
        effect(() => {
          if (this.visible()) {
            this.modalRef.show();
          } else {
            this.modalRef.hide();
          }
        });
      });
    }
  }

  close() {
    this.visible.set(false);
  }
}
