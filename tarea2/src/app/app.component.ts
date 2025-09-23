import { Component } from '@angular/core';
import { ParentComponent } from './parent/parent';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ParentComponent],
  template: `
    <h1 class="title">Comunicación entre Siblings</h1>
    <app-parent></app-parent>
  `,
  styles: [`
    .title {
      text-align: center;
      margin: 20px 0;
      font-size: 24px;
      font-family: Arial, sans-serif;
    }
  `]
})
export class AppComponent {}
