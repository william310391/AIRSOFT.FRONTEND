import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-paginacion',
  imports: [],
  templateUrl: './paginacion.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginacionComponent {
  @Input() currentPage = 1;
  @Input() totalPages = 1;
  @Input() hasPrev = false;
  @Input() hasNext = false;

  @Output() pageChange = new EventEmitter<number>();

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.pageChange.emit(page);
    }
  }
}
