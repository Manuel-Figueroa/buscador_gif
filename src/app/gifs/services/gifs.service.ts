import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gifs, SearchResponse } from '../interfaces/gifs.interfaces';

@Injectable({providedIn: 'root'})
export class GifsService {
  public gifList:Gifs[]=[];

  private _tagHistory:string[]=[];
  private apiKey:string='Tu0YDSC2FwnfQplRnWC2Duu3L3j8K05g';
  private serviceUrl:string ='https://api.giphy.com/v1/gifs/';

  constructor(private http:HttpClient) {
    this.loadLocakStorange();
    console.log('Gifs services ready');
  }

  get tagHistory(){
    return [...this._tagHistory];
  }

  private organizeHistory(tag:string){
    tag=tag.toLowerCase();

    if(this._tagHistory.includes(tag)){

      this._tagHistory = this._tagHistory.filter( (oldTag)=> oldTag !== tag);
    }

    this._tagHistory.unshift(tag);
    this._tagHistory=this._tagHistory.splice(0,10);
    this.saveLocalStorange();
  }

  private saveLocalStorange():void{
    localStorage.setItem('history',JSON.stringify(this.tagHistory));
  }
  private loadLocakStorange():void{
    if(!localStorage.getItem('history')) return;
    this._tagHistory= JSON.parse(localStorage.getItem('history')!)

    if(this._tagHistory.length === 0) return;
    this.searchTag(this._tagHistory[0]);

  }
  searchTag(tag:string):void{
    if(tag.length === 0) return;
    this.organizeHistory(tag);
    const params = new HttpParams()
    .set('api_key',this.apiKey)
    .set('limit','10')
    .set('q',tag)
    this.http.get<SearchResponse>(`${this.serviceUrl}search`,{params})
      .subscribe(resp =>{
        this.gifList=resp.data;
      })
  }
}
