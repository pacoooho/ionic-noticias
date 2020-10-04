import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RespuestaTopHeadLines } from '../interfaces/interfaces';
import { environment } from '../../environments/environment';

const apiKey = environment.apiKey;
const apiUrl = environment.apiUrl;

const headers = new HttpHeaders({
  "X-Api-key": apiKey
})

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

headlinesPage = 0;

categoriaActual='';
categoriaPage=0;

  constructor(private http: HttpClient) { }

  private ejecutarQuery<T>(query: string) {
    query = apiUrl + query;
    return this.http.get<T>(query, { headers });
  }


  getTopHeadLines() {
    // return this.http.get<RespuestaTopHeadLines>(`${apiUrl}/everything?q=bitcoin&sortBy=publishedAt&apiKey=${apiKey}`);
   this.headlinesPage++;
   //console.log("headlinesPage ",this.headlinesPage);
    return this.ejecutarQuery<RespuestaTopHeadLines>(`/top-headlines?country=us&page=${this.headlinesPage}`);

  }
  getTopHeadLinesCategorias(categoria: string) {
  
  if (this.categoriaActual=== categoria){
    this.categoriaPage++;
  }else {
    this.categoriaPage=1 ;
     this.categoriaActual= categoria;
  }
//  console.log("categoriaActual ",this.categoriaActual);
 // console.log("categoriaPage ",this.categoriaPage);

    // return this.http.get<RespuestaTopHeadLines>(`${apiUrl}/top-headlines?country=es&apiKey=${apiKey}`);
    return this.ejecutarQuery<RespuestaTopHeadLines>(`/top-headlines?country=us&category=${categoria}&page=${this.categoriaPage}`);
  }
}
