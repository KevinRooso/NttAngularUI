import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/auth-service.service';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-role',
  templateUrl: './create-role.component.html',
  styleUrls: ['./create-role.component.css'],
})
export class CreateRoleComponent implements OnInit {
  createUserForm: FormGroup;
  checkError: any;
  submitted = false;
  constructor(
    private frmbuilder: FormBuilder,
    private authService: AuthServiceService,
    private location: Location,
    public snackBar: MatSnackBar,
    private router: Router
  ) {
    this.createUserForm = this.frmbuilder.group({
      name: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.checkError = (controlName: string, errorName: string, checkSubmitted: boolean) => {
      if (checkSubmitted) {
        if (this.submitted) {
          return this.createUserForm.controls[controlName].hasError(errorName);
        }
      } else {
        return this.createUserForm.controls[controlName].hasError(errorName);
      }
    };
  }

  createRole() {
    if (this.createUserForm.valid) {
      const obj = {
        id: 0,
        isInternal: false,
        name: this.createUserForm.controls['name'].value,
        privilegeList: [0],
      };
      this.authService.saveRole(obj).subscribe(
        (_response) => {
          this.snackBar.open('Role successfully created', 'Close', { duration: 5000 });
          this.submitted = false;
          this.router.navigate(['/roles']);
        },
        (_error) => {
          this.snackBar.open('Oops, Something went wrong', 'Close', {
            duration: 5000,
          });
        }
      );
    } else {
      this.snackBar.open('Please fill all mandatory input field', 'Close', { duration: 5000 });
    }
  }
  BackMe() {
    this.location.back(); // <-- go back to previous location on cancel
  }
}
