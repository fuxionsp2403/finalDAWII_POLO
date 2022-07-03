import { Component, OnInit } from '@angular/core';
import { Sede } from 'src/app/models/sede.model';
import { PaisService } from 'src/app/services/pais.service';
import { Pais } from 'src/app/models/pais.model';
import { SedeService } from 'src/app/services/sede.service';

@Component({
  selector: 'app-registra-sede',
  templateUrl: './registra-sede.component.html',
  styleUrls: ['./registra-sede.component.css']
})
export class RegistraSedeComponent implements OnInit {

sede : Sede = {};
pais!:Pais[];
idPais:number=0;
fecha!:String;
date!:Date;


  constructor(private sedeService: SedeService, 
    private paisService:PaisService) { }

  ngOnInit(): void {

    console.log(this.fecha)
    this.paisService.listaPais().subscribe(x => {
      this.pais=x
    })
    this.date=new Date()
    this.fecha=this.date.getFullYear()+"-"+(this.date.getMonth()+1)+"-"+this.date.getDate();
    console.log(this.fecha)


  }

  saveSede(){
    this.sede.estado = 1;
    this.sede.pais = new Pais(this.idPais)
    this.sedeService.saveSede(this.sede).subscribe(
      response => {
        alert(response.mensaje)
      },error => {
        alert(error);
      }
      
    )
  }



}
