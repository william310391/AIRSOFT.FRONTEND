import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { ErrorService } from '../../services/error.service';
import { HttpStatus } from '../../constants/HTTP_STATUS_CODES';

@Component({
  selector: 'app-error-pages-unauthorized',
  imports: [],
  templateUrl: './error-pages-code.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ErrorPagesCodeComponent {
  httpStatus = signal<HttpStatus | null>(null);
  codeError = toSignal(inject(ActivatedRoute).params.pipe(map((params) => params['codeError'])));
  errorService = inject(ErrorService);

  constructor() {
    this.httpStatus.set(
      this.errorService.getStatus(this.codeError() == null ? 401 : this.codeError())
    );
  }
}
