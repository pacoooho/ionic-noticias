import { Component } from '@angular/core';
import { DataLocalService } from '../../services/data-local.service';
import { Article } from '../../interfaces/interfaces';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  sliderOpts ={
    allowSlidePrev: false,
    allowSlideNext: false,
    // shadowScale: 0.14
  }

   constructor(
    public dataLocalService: DataLocalService
    )
     {
    
  }

}
