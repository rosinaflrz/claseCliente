import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-right-panel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './right-panel.html',
  styleUrls: ['./right-panel.css']
})
export class RightPanelComponent {
  @Input() selectedTitle: string | null = null;
  @Output() clearSelection = new EventEmitter<void>();
}
