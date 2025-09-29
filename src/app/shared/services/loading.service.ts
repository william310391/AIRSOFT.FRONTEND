import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  constructor() {}
  isLandingPage = signal<boolean>(false);
}
