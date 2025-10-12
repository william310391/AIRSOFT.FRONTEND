export interface ConfigAlert {
  icon: 'success' | 'error' | 'warning' | 'info' | 'question';
  title: string;
  text?: string;
  timer?: number;
  showConfirmButton?: boolean;
  showCancelButton: boolean;
  confirmButtonColor: string;
  cancelButtonColor: string;
  confirmButtonText: string;
  fnConfirm?: Function;
  fnCancel?: Function;
  position?:
    | 'top'
    | 'top-start'
    | 'top-end'
    | 'center'
    | 'center-start'
    | 'center-end'
    | 'bottom'
    | 'bottom-start'
    | 'bottom-end';
}
