import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';

@Component({
  selector: 'app-search',
  imports: [],
  templateUrl: './search.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Search {
  buscar = signal<string>('');
  accionBuscar = input.required<(buscar: string) => void>();
  accionNuevo = input<() => void>();

  onBuscar() {
    const value = this.buscar();
    this.accionBuscar()(value); // 👈 llama al padre
  }

  onNuevo() {
    this.accionNuevo()?.();
  }
}
