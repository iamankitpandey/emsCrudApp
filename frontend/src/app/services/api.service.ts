import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }


  postEmployee(data: any){
    return this.http.post<any>("http://localhost:3000/employees/", data);
 console.log(data);
//  return axios.post("http://localhost:3000/employees/", data);

  }

  getEmployee(){
    return this.http.get<any>("http://localhost:3000/employees/");
  }

  putEmployee(data: any, id: number){
    return this.http.put<any>("http://localhost:3000/employees/"+id, data);
  }

  deleteEmployee(id:number){
    return this.http.delete<any>("http://localhost:3000/employees/"+id);
  }

}
