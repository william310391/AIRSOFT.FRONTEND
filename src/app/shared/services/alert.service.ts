import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { ConfigAlert } from '../interfaces/configAlert';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor() {}

  private defaultConfigAlert: ConfigAlert = {
    icon: 'info',
    title: '',
    position: 'center',
    showConfirmButton: false,
    timer: 1500,
  };

  alert(config: Partial<ConfigAlert>) {
    const finalConfig = { ...this.defaultConfigAlert, ...config };

    Swal.fire({
      position: finalConfig.position,
      icon: finalConfig.icon,
      title: finalConfig.title,
      text: finalConfig.text,
      showConfirmButton: finalConfig.showConfirmButton,
      timer: finalConfig.timer,
    });
  }
}
