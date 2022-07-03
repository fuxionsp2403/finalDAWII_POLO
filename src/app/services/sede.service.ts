import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Sede } from '../models/sede.model';
import { AppSettings } from '../app.settings';

const baseUrlUtil = AppSettings.API_ENDPOINT+ 'util';
const baseUrlSede = AppSettings.API_ENDPOINT+ 'sede';

@Injectable({
  providedIn: 'root'
})
export class SedeService {

  constructor(private http:HttpClient) { }

 listaSede(): Observable<Sede[]>
{
  return this.http.get<Sede[]>(baseUrlSede + '/listaSede');

}
saveSede(data:Sede): Observable<any> {
  return this.http.post(baseUrlSede, data)
}
 
listaSedeFiltro(nombre:string, direccion:string, estado:number, fechaCreacion:string,codigoPostal:string, idPais:number): Observable<any>{
  const params = new HttpParams().set("nombre",nombre).set("direccion",direccion).set("estado",estado).set("fechaCreacion",fechaCreacion).set("codigoPostal",codigoPostal).set("idPais",idPais)
  return this.http.get(baseUrlSede+"listaSedeFiltros", {params});
}

listaSedeNombre(filtro:string):Observable<Sede[]> {
  return this.http.get<Sede[]>(baseUrlSede + "/listaSedePorNombre/"+ filtro);
}

registraDocente(data: Sede): Observable<any>{
  return this.http.post(baseUrlSede+ "/registraSede", data);
}

actualizaSede(data: Sede): Observable<any>{
return this.http.put(baseUrlSede + "/actualizaSede", data);
}

eliminaSede(id: any): Observable<any>{
  return this.http.delete(baseUrlSede + "/eliminaSede/" + id);
}

}
