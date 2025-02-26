import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostFileServiceService {

  constructor(private http: HttpClient) { }
  private handleError(error: HttpErrorResponse){
    if(error.status===0){
      console.error("an error occurred: "+error.error);
    }else if(error.status===400){
      let er = Object.values(error);
      console.error(`Backend returned code ${error.status}, body was: `+er)
    }else if(error.status===500){
      console.error(error.message);
    }
    return throwError(()=>new Error('something bad happened: '+error.status)); 

  }
  public postFile(formData: FormData): Observable<any>{
    const url = `http://localhost:8080/api/v1/file/`;
    return this.http.post<any>(url, formData)
    .pipe(catchError(this.handleError));
  }

  public getAllFiles(): Observable<any>{
    const url = `http://localhost:8080/api/v1/file/`;
    return this.http.get<any>(url)
      .pipe(catchError(this.handleError));
  }
  public getFilebyIdJson(id: string): Observable<any>{
    const url = `http://localhost:8080/api/v1/file/${id}`;
    return this.http.get<any>(url)
      .pipe(catchError(this.handleError));
  };
  public getFilebyId(id: string): Observable<Blob>{
    const url = `http://localhost:8080/api/v1/file/${id}/download`;
    return this.http.get(url, {responseType: 'blob'})
      .pipe(catchError(this.handleError));
  };
}
