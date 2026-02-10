import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { catchError, map, Observable, throwError } from 'rxjs';

export interface responseModel {
  success: boolean,
  message: string,
  data: any
}

@Injectable({
  providedIn: 'root'
})
export class Common {

  baseUrl: string = "https://localhost:44300/api/";

  constructor(private readonly http: HttpClient, private spinner: NgxSpinnerService, private router: Router) { }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem("jwtToken");
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    });

    if (token) {
      headers = headers.set("Authorization", `Bearer ${token}`);
    }

    return headers;
  }

  // Handle 401 Unauthorized errors (token expired)
  private handleAuthError(error: any): Observable<never> {
    if (error.status === 401) {
      localStorage.clear();
      this.router.navigate(['/login']);
    }
    this.spinner.hide();
    return throwError(() => error);
  }

  // ✅ Common Methods with JWT Headers
  getData(url: string): Observable<responseModel> {
    return this.http.get(this.baseUrl + url, { headers: this.getHeaders() }).pipe(
      map((response: any) => {
        return {
          success: response.success,
          message: response.message,
          data: response.data
        };
      }),
      catchError((error: any) => this.handleAuthError(error))
    );
  }

  postData(url: string, data: any): Observable<responseModel> {
    return this.http.post(this.baseUrl + url, data, { headers: this.getHeaders() }).pipe(
      map((response: any) => {
        return {
          success: response.success,
          message: response.message,
          data: response.data
        };
      }),
      catchError((error: any) => this.handleAuthError(error))
    );
  }

  putData(url: string, data: any): Observable<responseModel> {
    return this.http.put(this.baseUrl + url, data, { headers: this.getHeaders() }).pipe(
      map((response: any) => {
        return {
          success: response.success,
          message: response.message,
          data: response.data
        };
      }),
      catchError((error: any) => this.handleAuthError(error))
    );
  }

  deleteData(url: string): Observable<responseModel> {
    return this.http.delete(this.baseUrl + url, { headers: this.getHeaders() }).pipe(
      map((response: any) => {
        return {
          success: response.success,
          message: response.message,
          data: response.data
        };
      }),
      catchError((error: any) => this.handleAuthError(error))
    );
  }

  postFormData(url: string, formData: FormData): Observable<responseModel> {
    const token = localStorage.getItem("jwtToken");

    let headers = new HttpHeaders({
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    });

    if (token) {
      headers = headers.set("Authorization", `Bearer ${token}`);
    }

    return this.http.post(this.baseUrl + url, formData, { headers }).pipe(
      map((response: any) => {
        return {
          success: response.success,
          message: response.message,
          data: response.data
        };
      }),
      catchError((error: any) => this.handleAuthError(error))
    );
  }
}
