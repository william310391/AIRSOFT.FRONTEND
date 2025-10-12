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
    showCancelButton: true,
    confirmButtonColor: '3085d6',
    cancelButtonColor: 'd33',
    confirmButtonText: 'Yes, delete it!',
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

  confirm(config: Partial<ConfigAlert>) {
    Swal.fire({
      title: config.title || 'Are you sure?',
      text: config.text || 'You wont be able to revert this!',
      icon: config.icon || 'warning',
      showCancelButton: config.showCancelButton || true,
      confirmButtonColor: config.confirmButtonColor || '#3085d6',
      cancelButtonColor: config.cancelButtonColor || '#d33',
      confirmButtonText: config.confirmButtonText || 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        config.fnConfirm?.();
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        config.fnCancel?.();
      }
    });
  }
}
