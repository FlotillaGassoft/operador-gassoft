import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const baseUrl = environment.BASE_API_URL || 'http://localhost:3000/api';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {
  }

  login(data: any): Observable<any> {
    return this.http.post(`${baseUrl}/auth/login/`, data, {observe: "response"});
  }

  getUserByToken(token: any): Observable<any> {
    return this.http.get<any>(`${baseUrl}/getUserByToken/${token}`);
  }

  getCarInfo(nip: string, carCardNumber: string): Observable<any> {
    return this.http.get(`${baseUrl}/tarjeta/${nip}/${carCardNumber}`);
  }

  getDriverInfo(idChofer: string, nip: string, token: string): Observable<any> {
    return this.http.get(`${baseUrl}/chofer/${idChofer}/${nip}/${token}`);
  }


  private createAuthHeader(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': localStorage.getItem('auth-token') + ""
    });
  }

  getAll(): Observable<any> {
    return this.http.get<any>(baseUrl);
  }
  get(id: any): Observable<any> {
    return this.http.get<any>(`${baseUrl}/${id}`);
  }
  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }
  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }
  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }
  findByTitle(title: any): Observable<any> {
    return this.http.get<any>(`${baseUrl}?title=${title}`);
  }
}
