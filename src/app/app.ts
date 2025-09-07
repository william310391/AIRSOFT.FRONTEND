import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Modal } from 'bootstrap';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('angular-boostrap');




  
// openModal() {
//     const modalEl = document.getElementById('exampleModal');
//     if (modalEl) {
//       const modal = new Modal(modalEl);
//       modal.show();
//     }
//   }
  
}
