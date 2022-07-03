import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppSettings } from '../app.settings';
import { Cliente } from '../models/cliente.model';

const baseUrlUtil = AppSettings.API_ENDPOINT+ 'util';
const baseUrlCliente = AppSettings.API_ENDPOINT+ 'cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  
  constructor(private http:HttpClient) { }

  listaCliente():Observable<Cliente[]>{
    return this.http.get<Cliente[]>(baseUrlUtil+"/listaCliente");
  }

  saveClient(data:Cliente): Observable<any> {
    return this.http.post(baseUrlCliente, data)
  }

  listFilterClient(nombre:string, apellidos:string, fechaNacimiento:string, dni:string, estado:number, idUbigeo:number): Observable<any> {
    const params = new HttpParams().set("nombre", nombre).set("apellidos", apellidos).
    set("fechaNacimiento",fechaNacimiento).set("dni", dni).set("estado", estado).set("idUbigeo", idUbigeo)
    return this.http.get(baseUrlCliente+"/listaFiltros", {params});
  }

  updateClient(obj: Cliente): Observable<any> {
    return this.http.put(baseUrlCliente + "/actualizaCliente", obj);
  }

  deleteClient(id: any): Observable<any> {
    return this.http.delete(baseUrlCliente + "/eliminaCliente/" + id);
  }

  listClientName(filtro: string): Observable<any> {
    return this.http.get(baseUrlCliente + "/listaClientePorNombreLike/" + filtro);
  }

  

  
}
