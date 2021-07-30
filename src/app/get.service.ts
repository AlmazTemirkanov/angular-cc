import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class FirstResponse {
  private headers = new HttpHeaders({ "Content-Type": "application/json" });
  constructor(private http: HttpClient) {}
  someText: any;
  getData() {
    return fetch("http://172.28.141.23:8282/api/v1/ОВиКК/" + this.someText, {
      mode: "cors",
    });
  }

  private handleError(error: any): Promise<any> {
    console.error("Data is not defind", error);
    return Promise.reject(error.message || error);
  }
}
