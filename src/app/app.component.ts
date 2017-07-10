import { Component } from '@angular/core';
import {Http, Response} from '@angular/http';
@Component({
  selector: 'app-root',
  
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {


  constructor(private http: Http){}

  title = 'Colori';
  colorej = {
  codice: "",
  collezione: "PELLI",
  }; 


codiceColore= "";
hslColore="";
h;
s;
l;
 onSubmit(form: any): void {  
    console.log('you submitted value:', form.cod);
this.http.get('http://localhost:8080/colore')
.subscribe(
(res: Response)=>{const colore = res.json();
  for (var i = 0; i < colore.length; i++){
  // look for the entry with a matching `code` value
  if (colore[i].codice == form.cod){
 this.codiceColore=  colore[i].codice;
this.h = colore[i].h;
this.s = colore[i].s;
this.l = colore[i].l;
this.hslColore= colore[i].h + ", "+ colore[i].s + ", "+ colore[i].l;
console.log(colore[i]);
  }/*
this.codiceColore=  colore[0].codice;
this.h = colore[0].h;
this.s = colore[0].s;
this.l = colore[0].s;
this.hslColore= colore[0].h + ", "+ colore[0].s + ", "+ colore[0].l;
*/}}
)}
 
}
