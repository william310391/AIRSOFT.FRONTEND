export interface ContextMenuAction {
  type: string;

  /** texto visible en el menú */
  label: string;

  /** opcional: clase de icono (ej: Bootstrap, FontAwesome, etc.) */
  icon?: string;

  /** opcional: si quieres deshabilitar acciones en ciertos casos */
  disabled?: boolean;
}
