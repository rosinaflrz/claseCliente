import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-left-panel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './left-panel.html',
  styleUrls: ['./left-panel.css']
})
export class LeftPanelComponent {
  titles: string[] = [
    'Cien años de soledad',
    'El nombre del viento',
    'Interstellar',
    'Bohemian Rhapsody',
    'La La Land'
  ];

  @Input() selectedTitle: string | null = null;
  @Output() titleSelected = new EventEmitter<string>();

  select(item: string) {
    this.titleSelected.emit(item);
  }
}
