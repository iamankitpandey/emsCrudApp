import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validator, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  constructor(private formBuilder : FormBuilder,
    private api: ApiService, 
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef : MatDialogRef<DialogComponent>) { }
  
  employeeForm !: FormGroup;
  actionBtn : string ="Save";
  
  ngOnInit(): void {
    this.employeeForm = this.formBuilder.group({
      employeeName : ['', Validators.required],
      employeeDepartment : ['', Validators.required],
      employeeDesignation : ['', Validators.required]
    });

    console.log(this.editData);

    if(this.editData){
      this.actionBtn = "Update";
      this.employeeForm.controls['employeeName'].setValue(this.editData.name);
      this.employeeForm.controls['employeeDepartment'].setValue(this.editData.dept);
      this.employeeForm.controls['employeeDesignation'].setValue(this.editData.position);
    }
  }

  addEmployee(){
    console.log(this.employeeForm.value);
    // this.empService.addEmployee(this.employeeForm.value).subscribe( )

    if(!this.editData){
      if(this.employeeForm.valid){

        this.api.postEmployee(this.employeeForm.value)
        .subscribe({
          next:(res)=>{
            alert("Employee added successfully");
            this.employeeForm.reset();
            this.dialogRef.close('save');
          },
          error:()=>{
            alert("Error while adding the employee");
          }
        })
      }
    }else{
      this.updateEmployee()
    }
  }

  updateEmployee(){
    console.log(this.editData);
    this.api.putEmployee(this.employeeForm.value, this.editData._id)
    .subscribe({
      next:(res)=>{
        alert("Employee updated successfully");
        this.employeeForm.reset();
        this.dialogRef.close('update');
      },
      error:()=>{
        alert("Error while updating the record !!");
      }
    })
  }

}
