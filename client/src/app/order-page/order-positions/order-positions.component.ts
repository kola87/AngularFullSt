import { Position} from './../../shared/interfaces';
import { PositionsService } from './../../shared/services/positions.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-order-positions',
  templateUrl: './order-positions.component.html',
  styleUrls: ['./order-positions.component.css']
})
export class OrderPositionsComponent implements OnInit {

  positions$: Observable<Position[]>

  constructor(private route: ActivatedRoute,
              private  positionsService: PositionsService,
              private order: OrderService 
    ) { }

  ngOnInit() {
   this.positions$ =  this.route.params
    .pipe(
      switchMap(
                (params: Params) =>{
        return this.positionsService.fetch(params['id'])
      }),
      map((positions: Position[])=>{ //дефолтное значение 1
        return positions.map(position =>{ //добавляем каждой позиции еденицу
          position.quantity = 1
          return position
        })
      })
    )
  }
  addToOrder(position: Position){
    console.log(position)
    this.order.add(position)
  }

}
