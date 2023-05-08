import { Component, Input } from '@angular/core';
import { Gifs } from '../../interfaces/gifs.interfaces';

@Component({
  selector: 'gifs-card-list',
  templateUrl: './card-list.component.html'
})
export class CardListComponent {
  @Input()
  public gifs:Gifs[]=[];
}
