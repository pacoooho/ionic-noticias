import { Component, ViewChild, OnInit } from '@angular/core';
import { IonSegment } from '@ionic/angular';
import { NoticiasService } from 'src/app/services/noticias.service';
import { Article } from '../../interfaces/interfaces';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  @ViewChild(IonSegment) segment: IonSegment;

  categorias = ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology']

  noticias: Article[] = [];


  constructor(
    private noticiasService: NoticiasService
  ) { }

  ngOnInit() {
 
    this.cargarNoticias(this.categorias[0]);
    // this.segment.value = cate;

  }


  cambioCategoria(event) {

    this.noticias = [];
    this.cargarNoticias(event.detail.value)
  }


  cargarNoticias(categoria: string, event?) {

    this.noticiasService.getTopHeadLinesCategorias(categoria)
      .subscribe(
        res => {
          // console.log('noticias', res);
          this.noticias.push(...res.articles);
          if (event) {
            event.target.complete();
          }
        }
      )
  }

  loadData(event) {

    this.cargarNoticias(this.segment.value, event)
  }
}
