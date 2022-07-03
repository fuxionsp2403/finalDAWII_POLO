import { Component, OnInit } from '@angular/core';
/* import { Cliente } from 'src/app/models/proveedor.model; */
import { Ubigeo } from 'src/app/models/ubigeo.model';
/* import { ClienteService } from 'src/app/services/proveedor.service; */
import { UbigeoService } from 'src/app/services/ubigeo.service';


@Component({
  selector: 'app-registra-proveedor',
  templateUrl: './registra-proveedor.component.html',
  styleUrls: ['./registra-proveedor.component.css']
})
export class RegistraProveedorComponent implements OnInit {
	
/* 	ubigeoDepartamentos: string[] = [];
	ubigeoProvincias: string[] = [];
	ubigeoDistritos: Ubigeo[] = [];
	
	prov: Proveedor = {
		ubigeo:{
			idUbigeo: -1,
      departamento: "-1",
      provincia: "-1",
      distrito: "",
    },
  };

  constructor(
	private proveedorService: ProveedorService,
	private ubigeoService: UbigeoService
	) {
		this.ubigeoService
		.listarDepartamento()
		.subscribe((departamento) => (this.ubigeoDepartamentos = departamento));
	  }
	  
	  listaProvincia() {
      this.ubigeoService
      .listaProvincias(
	  this.prov.ubigeo?.departamento
        )
      .subscribe((provincias) => (this.ubigeoProvincias = provincias));
 	  }
 	  
 	  listaDistrito() {
      this.ubigeoService
      .listaDistritos(
        this.prov.ubigeo?.departamento,
		this.prov.ubigeo?.provincia
		)
      .subscribe((distritos) => (this.ubigeoDistritos = distritos));
  }
	saveProvMethod(){
		this.proveedorService.saveProv(this.prov).subscribe(
			response => {
				alert(response.mensaje)
			},
			error => {
				alert(error)
			}
		);
	}	 */
		
  ngOnInit(): void {}

}
