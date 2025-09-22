import { Component, inject, Input } from '@angular/core';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css'],
})
export class LoadingComponent {
  sharedService = inject(SharedService);
}
