import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostFileServiceService {

  constructor(private http: HttpClient) { }
  public postFile(formData: FormData): Observable<any>{
    const url = `http://localhost:8080/api/v1/file/`;
    return this.http.post(url+`/Upload`, formData);
  }
}
