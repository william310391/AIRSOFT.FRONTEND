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
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-modal',
  standalone: true,
  templateUrl: './modal.component.html',
})
export class ModalComponent implements AfterViewInit {
  size = input<'sm' | 'lg' | 'xl' | ''>('sm');
  modalId = input('defaultModal'); // 👈 id del modal
  modalRef!: Modal;

  injector = inject(EnvironmentInjector);
  modalService = inject(ModalService);

  ngAfterViewInit() {
    const modalElement = document.getElementById(this.modalId());

    if (modalElement) {
      this.modalRef = new Modal(modalElement, {
        backdrop: true,
        keyboard: true,
        focus: true,
      });

      // 👉 sincronizar con servicio al cerrarse
      modalElement.addEventListener('hidden.bs.modal', () => {
        this.modalService.close(this.modalId());
        (document.activeElement as HTMLElement)?.blur();
      });

      // 👉 al abrir, poner foco en el primer input/botón
      modalElement.addEventListener('shown.bs.modal', () => {
        const focusable = modalElement.querySelector<HTMLElement>(
          'input, select, textarea, button:not(.btn-close), [tabindex]:not([tabindex="-1"])'
        );
        focusable?.focus();
      });

      // 👉 reactividad desde el servicio
      runInInjectionContext(this.injector, () => {
        effect(() => {
          if (this.modalService.isVisible(this.modalId())) {
            this.modalRef.show();
          } else {
            this.modalRef.hide();
          }
        });
      });
    }
  }

  close() {
    this.modalService.close(this.modalId());
  }
}
