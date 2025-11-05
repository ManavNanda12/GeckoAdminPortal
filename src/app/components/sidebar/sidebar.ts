import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  standalone: false,
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.scss']
})
export class Sidebar {
  @Output() toggle = new EventEmitter<void>();
  @Input() isCollapsed = false;

  toggleSidebar(event: Event) {
    event.preventDefault();
    this.toggle.emit();
  }
}
