// import { HttpClient, HttpErrorResponse } from '@angular/common/http';
// import { Component, OnInit } from "@angular/core";
// import { Category } from '../shared/interfaces';
// import { Observable } from 'rxjs';




// @Component({
//   selector: 'app-categories-page',
//   templateUrl: './categories-page.component.html',
//   styleUrls: ['./categories-page.component.css']
// })



// export class CategoriesPageComponent implements OnInit{
// title = 'app'
// categories: Category[] = []

//   constructor(private http: HttpClient){

//   }
  
  

// ngOnInit(): void{
//     this.http.get('https://my-json-server.typicode.com/typicode/demo/db').subscribe(data => {
     
//       console.log(data)
//     },(err: HttpErrorResponse)=>{
//       if(err.error instanceof Error){
//         console.log('Client-side error occured.')
//       }else{ 
//         console.log('Server-side error occured.')
//       }
      
//     }

    
//     )
// }

// }

import { Category } from './../shared/interfaces';


import { CategoriesService } from './../shared/services/categories.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-categories-page',
  templateUrl: './categories-page.component.html',
  styleUrls: ['./categories-page.component.css']
})
export class CategoriesPageComponent implements OnInit {
  
  categories$: Observable<Category[]>
  

  constructor(private categoriesService: CategoriesService) {
    
   }

  ngOnInit(){
      
    this.categories$ = this.categoriesService.fetch()
    
  }

}