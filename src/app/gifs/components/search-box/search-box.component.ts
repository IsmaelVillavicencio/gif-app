import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../../services/gifs.service';

@Component({
  selector: 'gifs-search-box',
  template: `
    <h3>Search gifs</h3>
    <input type="search"
      placeholder="Type anything..."
      class="form-control"
      (keyup.enter)="searchTag()"
      #txtTagInput
    >
  `,
})

export class SearchBoxComponent {
  constructor(
    private gifsService: GifsService
  ) { }

  @ViewChild('txtTagInput')
  tagInput!: ElementRef<HTMLInputElement>;
/*
  searchTag(newTag: string) {
    console.log({newTag});
  }
*/
  searchTag() {
    const newTag = this.tagInput.nativeElement.value;
    this.gifsService.searchTag(newTag);
    this.tagInput.nativeElement.value = '';
  }
}
