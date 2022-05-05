import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ApiService } from './services/api.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { DialogComponent } from './navbar/dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'frontend';


  displayedColumns: string[] = ['employeeName', 'employeeDepartment', 'employeeDesignation', 'action'];
  dataSource !: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog: MatDialog, private api: ApiService ){

  }
  ngOnInit(): void {
    this.getAllEmployee();
  }

  public getAllEmployee(){
    this.api.getEmployee()
    .subscribe({
      next:(res)=>{
        console.log(res);
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error:(err)=>{
        alert("Error while fetching data !!")
      }
    })
  }

  editEmployee(row: any){
    this.dialog.open(DialogComponent,{
      width: '30%',
      data: row
    }).afterClosed().subscribe(val=>{
      if(val==='save'){
        this.getAllEmployee();
      }
    })
  }



  deleteEmployee(id: number){
    this.api.deleteEmployee(id)
    .subscribe({
      next: (res)=>{
        alert("Employee deleted successfully")
      },
      error:()=>{
        alert("Error while deleting the employee !!")
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
