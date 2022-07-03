import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppSettings } from '../app.settings';
import { Marca } from '../models/marca.model';

const baseUrlMarca = AppSettings.API_ENDPOINT+ 'marca';

@Injectable({
  providedIn: 'root',
})
export class MarcaService {

  constructor(private http: HttpClient) {  }

  listaMarca(): Observable<Marca[]> {
    return this.http.get<Marca[]>(baseUrlMarca + '/listaMarca');
  }

  listaMarcaNombre(nombre:string): Observable<any>{
    const params = new HttpParams().set("nombre", nombre)
    return this.http.get(baseUrlMarca+'/listaMarca_x_Nombre',{params})
  }

  buscaMarca(idMarca:number): Observable<any>{
    const params = new HttpParams().set("idMarca", idMarca)
    return this.http.get(baseUrlMarca+'/ObtenerMarca',{params})
  }

  saveMarca(data:Marca): Observable<any> {
    return this.http.post(baseUrlMarca, data)
  }

  updateMarca(data:Marca):Observable<any>{
    return this.http.put(baseUrlMarca+'/actualizaMarca', data)
  }

  deleteMarca(id: any):Observable<any>{
    return this.http.delete(baseUrlMarca+'/eliminaMarca/'+id)
  }


  listadoMarcasParametros(nombre:string, descripcion:string, fechaVigencia:string, estado:number, idPais:number): Observable<any>{
      const params = new HttpParams().set("nombre", nombre).set("descripcion", descripcion).
      set("fechaVigencia",fechaVigencia).set("estado",estado).set("idPais", idPais)
      return this.http.get(baseUrlMarca+"/listaMarcaConParametros", {params})
  }

}
