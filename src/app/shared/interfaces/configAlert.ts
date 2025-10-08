export interface ConfigAlert {
  icon: 'success' | 'error' | 'warning' | 'info' | 'question';
  title: string;
  text?: string;
  timer?: number;
  showConfirmButton?: boolean;
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
