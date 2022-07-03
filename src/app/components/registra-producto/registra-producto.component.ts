import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../services/producto.service';
import { Producto } from '../../models/producto.model';
import { MarcaService } from '../../services/marca.service';
import { PaisService } from '../../services/pais.service';
import { Marca } from '../../models/marca.model';
import { Pais } from '../../models/pais.model';

@Component({
  selector: 'app-registra-producto',
  templateUrl: './registra-producto.component.html',
  styleUrls: ['./registra-producto.component.css']
})
export class RegistraProductoComponent implements OnInit {

  p:Producto = new Producto();
  
  marca!:Marca[];
  pais!:Pais[];
  idPais:number=0;
  idMarca:number=0;
  fecha!:String;
  date!:Date;
  constructor(private ProductoService: ProductoService
    ,private marcaService: MarcaService,
    private paisService:PaisService) { }

  ngOnInit(): void {
    this.marcaService.listaMarca().subscribe(x => {
      this.marca=x
    })
    this.paisService.listaPais().subscribe(x => {
      this.pais=x
    })
    this.date=new Date()
    this.fecha=this.date.getFullYear()+"-"+(this.date.getMonth()+1)+"-"+this.date.getDate();
    console.log(this.fecha)
  }


  guardar(){
    this.date=new Date();
    this.p.fechaRegistro=this.fecha+" "
    +this.date.getHours()+":"+this.date.getMinutes()+":"+this.date.getSeconds()
    this.p.pais= new Pais(this.idPais)
    this.p.marca= new Marca(this.idMarca)
    console.log(JSON.stringify(this.p))
    this.ProductoService.saveProducto(this.p).subscribe(x =>{
      alert(x.mensaje+" : el dia -> "+this.p.fechaRegistro)
    })
  }

}
