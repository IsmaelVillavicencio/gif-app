import { Component } from '@angular/core';
import { GifsService } from '../../../gifs/services/gifs.service';

@Component({
  selector: 'shared-sidebar',
  templateUrl: 'sidebar.component.html',
  styleUrls: ['sidebar.component.css']
})
export class SidebarComponent {
  get historial() {
    return this.gifsService.historial;
  }
  constructor(
    private gifsService: GifsService
  ) { }

  searchAgain(termino: string) {
    this.gifsService.searchTag(termino);
  }

  clearHistorial() {
    this.gifsService.clearHistorial();
  }

  removeTag(tag: string) {
    this.gifsService.deleteTag(tag);
  }
}
