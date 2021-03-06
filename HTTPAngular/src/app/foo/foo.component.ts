import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';
import {Foo} from './foo.model'

@Component({
  selector: 'app-foo',
  templateUrl: './foo.component.html',
  styleUrls: ['./foo.component.css']
})
export class FooComponent implements OnInit {

  data: Object;
  fooData: Foo[];
  loading: boolean;
  o : Observable<Object>;
  oFoo : Observable<Foo[]>;

  constructor(public http: HttpClient) {}

   makeTypedRequest() : void
 {
   this.oFoo = this.http.get<Foo[]>('https://jsonplaceholder.typicode.com/posts');
   this.oFoo.subscribe(data => {this.fooData = data;});
 } 
  makeRequest(): void {
     //Notifichiamo che stiamo attendendo dei dati
     this.loading = true;
     //Facciamo una get e otteniamo l'oggetto Observable che attende la risposta
     this.o = this.http.get('https://jsonplaceholder.typicode.com/posts');
     //Attacchiamo all'Observable o un metodo "observer" che verrà lanciato quando arriva la
     //risposta
     this.o.subscribe(this.getData);
   }
   //Il metodo che notifica la risposta (nota che usiamo una "arrow function")
   getData = (d : Object) =>
   {
     this.data = d; //Notifico l’oggetto ricevuto dal server
     this.loading = false;  // Notifico che ho ricevuto i dati
   }

   makeCompactRequest(): void {
     this.loading = true;
     this.http
       .get('https://jsonplaceholder.typicode.com/posts/1')
       .subscribe(data => {
       this.data = data;
       this.loading = false;
       });
      }

  ngOnInit() {
  }

}
