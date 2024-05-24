import {  Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'share-lazy-image',
  templateUrl: './lazy-image.component.html',
})
export class LazyImageComponent implements OnInit {
  @Input()
  public url!: string;
  @Input()
  public alt: string = '';

  public isLoaded:boolean = false;

  ngOnInit(): void {
    if (!this.url) {
      throw new Error('Url property is required');
    }

  }
  onLoad(){
    this.isLoaded = true;
  }
}
