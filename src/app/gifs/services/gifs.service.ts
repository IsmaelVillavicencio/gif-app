import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchResponse, Gif } from '../interfaces/gifs.interfaces';

@Injectable({ providedIn: 'root' })
export class GifsService {

  private API_KEY: string = 'qqlHQOp4jMQonjpl5IPtntQNOwG7ICzU';
  private URL: string = 'https://api.giphy.com/v1/gifs';

  public gifList: Gif[] = [];

  private _historial: string[] = [];
  constructor(
    private http: HttpClient
  ) {
    this.loadLocalStorage();
  }

  get historial() {
    return [...this._historial];
  }

  searchTag(tag: string): void {
    if (tag.length === 0) return;
    this.organizeHistorial(tag);

    const params = new HttpParams()
      .set('api_key', this.API_KEY)
      .set('q', tag)
      .set('limit', '18');

    this.http.get<SearchResponse>(`${this.URL}/search`, { params: params })
      .subscribe((resp) => {
        this.gifList = resp.data;

      });

    /*
    fetch(`https://api.giphy.com/v1/gifs/search?api_key=${this.API_KEY}&q=${tag}&limit=10`)
    .then( resp => resp.json())
    .then( data => {console.log(data.data)})
    */
  }

  private organizeHistorial(tag: string): void {
    tag = tag.toLowerCase();
    if (this._historial.includes(tag)) {
      this._historial = this._historial.filter(t => t !== tag);
    }
    this._historial.unshift(tag);
    this._historial = this._historial.splice(0, 15);
    this.saveLocalStorage();
  }

  private saveLocalStorage(): void {
    localStorage.setItem('historial', JSON.stringify(this._historial));
  }

  public loadLocalStorage(): void {
    const historial = localStorage.getItem('historial');
    if (historial) {
      this._historial = JSON.parse(historial);
      if(this._historial.length > 0){
        let tag = this._historial[0];
        this.searchTag(tag);
      }
    }
  }

  public deleteTag(tag: string): void {
    this._historial = this._historial.filter(t => t !== tag);
    if(this._historial.length > 0){
      this.searchTag(this._historial[0]);
    }else{
      this.gifList = [];
    }
    this.saveLocalStorage();
  }

  public clearHistorial(): void {
    this._historial = [];
    this.saveLocalStorage();
    this.gifList = [];
  }


}
