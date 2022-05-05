import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class EmpserviceService {

  url = 'http://localhost:3000/employees';

  private subject =new Subject<any>();



  constructor(private http :HttpClient) { }

  addEmployee(emp: any){
    return this.http.post(this.url, emp)
  }
}
