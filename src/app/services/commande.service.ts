import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommandeService {
  private baseUrl = 'http://localhost:8080/api/commande';
  constructor(private http: HttpClient) {}
  saveCommande(commande: any): Observable<any> {
    
    return this.http.post(`${this.baseUrl}/save`, commande);
  }
  getAllCommand(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/List`);
  }
  updateCommande(commande: any): Observable<any> {
    const updateUrl = `${this.baseUrl}/${commande.id}`
    return this.http.put<any>(updateUrl, commande);
  }
  deleteCommande(commande: any): Observable<any> {
    const deleteUrl = `${this.baseUrl}/${commande.id}`;
    return this.http.delete(deleteUrl);

  }

  /*uploadOrdonnance(formData: FormData):Observable<any>{
   
    const uploadUrl = `${this.baseUrl}/uploadOrdonnance`;
    return this.http.post(uploadUrl,formData,{
      reportProgress: true,
      responseType:'json'
    });
    
  }*/
    uploadOrdonnance(file: File, clientId: number, produitIds: number[]): Observable<any> {
      const formData: FormData = new FormData();
      formData.append('file', file);
      formData.append('clientId', clientId.toString());
      produitIds.forEach((id, index) => {
        formData.append(`produitId[${index}]`, id.toString());
      });
  
      return this.http.post(this.baseUrl, formData);
    }

}
