import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { ContextMenuAction } from '../../interfaces/contextMenuAction';
import { ContextMenuService } from '../../services/contextMenu.service';

@Component({
  selector: 'app-constext-menu',
  imports: [],
  templateUrl: './constextMenu.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConstextMenuComponent {
  menuId = input.required<string>();

  constructor(public contextMenu: ContextMenuService) {}

  get menu() {
    return this.contextMenu.getMenu(this.menuId());
  }

  actionSelected = output<{ action: ContextMenuAction; data: any | null }>();

  onActionClick(action: ContextMenuAction) {
    this.actionSelected.emit({ action, data: this.menu.contextData });
    this.contextMenu.close(this.menuId());
  }
}
