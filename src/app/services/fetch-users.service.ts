import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { ErrorHandler, Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FetchUsersService {
  
  errorVar: boolean = false;
  public wrongEmail: boolean = false;
  public errorMessage!: string;
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
    return throwError(()=>new Error('something bad happened'+error.status));
  }

  public getUsers(): Observable<any>{
    const url = `http://localhost:8080/api/v1/user`;
    return this.http.get<any>(url)
    .pipe(catchError(this.handleError));
  }


  public postUsers(user_name: string, password: string, name: string, surname: string, birth: Date, eMail: string, role: string): Observable<any>{
    const body = JSON.stringify({ user_name, password, name, surname, birth, eMail, role })
    const httpOtions ={
      headers: new HttpHeaders({
        "Content-Type":"application/json",
      })
    };
    const url = `http://localhost:8080/api/v1/user?user_name=${user_name}&password=${password}&name=${name}&surname=${surname}&birth=${birth}&eMail=${eMail}&role=${role}`;
    return this.http.post<any>(url, body, httpOtions)
      .pipe(catchError(this.handleError));
  }
  public returnSpecificUser(user_name: string): Observable<any>{
    const url = `http://localhost:8080/api/v1/user/${user_name}`;
    return this.http.get<any>(url)
    .pipe(catchError(this.handleError));
  }

  public updateUser(user_name: string, password: string, name: string, surname: string,  eMail: string, userId: any): Observable<any>{
    const body = JSON.stringify({ user_name, password, name, surname, eMail, userId });
    const httpOtions ={
      headers: new HttpHeaders({
        "Content-Type":"application/json",
      })
    };
    const url = `http://localhost:8080/api/v1/user/${userId}`;
    return this.http.put<any>(url, body, httpOtions)
      .pipe(catchError(this.handleError));
  }

  public deleteUser(user_id: any): Observable<any>{
    const url = `http://localhost:8080/api/v1/user/${user_id}`;
    return this.http.delete<any>(url)
      .pipe(catchError(this.handleError));
  }

  
}
