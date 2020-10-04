import { Component, Input, OnInit } from '@angular/core';
import { Article } from '../../interfaces/interfaces';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { ActionSheetController } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { DataLocalService } from '../../services/data-local.service';
 
@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.scss'],
})
export class NoticiaComponent implements OnInit {

@Input() noticia: Article;
@Input() i: number;
@Input() enFavoritos;

  constructor( 
    private iab: InAppBrowser,
    private actionSheetCtl:  ActionSheetController,
    private socialSharing: SocialSharing,
    private dataLocalService: DataLocalService
 ) { }
   ngOnInit() {
     console.log("favoritos ", this.enFavoritos);
   
   
    }


  abrirNoticia(){
    const browser = this.iab.create(this.noticia.url,'_system');

    
    console.log("Noticia ", this.noticia.url);
  }

  async lanzarMenu (){
    
    let guardarBorrarBtn;

    if (this.enFavoritos){
      guardarBorrarBtn=  {
        text: 'Borrar favorito',
        icon: 'trash',
        cssClass:'action-dark',
        handler: () => {
          console.log('borrar de favorito');
          this.dataLocalService.borrarNoticia(this.noticia)
this.dataLocalService.presentToast("Noticia Borrada")
        }
      };
    }else {
      guardarBorrarBtn=  {
        text: 'Favorito',
        icon: 'star',
        cssClass:'action-dark',
        handler: () => {
          console.log('favorito clicked');
          this.dataLocalService.guardarNoticia(this.noticia)
          this.dataLocalService.presentToast("Noticia guardado")

        }
      };
    }
    
    const actionSheet = await this.actionSheetCtl.create({
  
      buttons: [{
        text: 'Compartir',
         icon: 'share',
         cssClass:'action-dark',
        handler: () => {
          console.log('share   clicked');
          this.socialSharing.share(
            this.noticia.title,
            this.noticia.source.name,
            '',
            this.noticia.url
          );
        }
      },guardarBorrarBtn ,   {
        text: 'Cancel',
        icon: 'close',
        cssClass:'action-dark',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }
}
