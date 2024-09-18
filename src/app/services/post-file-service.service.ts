import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostFileServiceService {

  constructor(private http: HttpClient) { }
  public postFile(name: string, size: any, type: any, username: any): Observable<any>{
    const body = JSON.stringify({name, size, type});
    const Options = {
      headers: new HttpHeaders({
        'content-type':'application/json',
      })
    }
    const url = `http://localhost:8080/api/v1/file?name=${name}&size=${size}&type=${type}&user_id=${username}`;
    return this.http.post(url, body, Options);
  }
}
