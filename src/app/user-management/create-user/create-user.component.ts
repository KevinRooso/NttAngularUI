import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/auth-service.service';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css'],
})
export class CreateUserComponent implements OnInit {
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
      email: ['', [Validators.required, Validators.email]],
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
  createUser() {
    if (this.createUserForm.valid) {
      const obj = {
        email: this.createUserForm.controls['email'].value,
        name: this.createUserForm.controls['name'].value,
        username: this.createUserForm.controls['email'].value,
        password: this.createUserForm.controls['email'].value,
        userType: 9,
        id: 0,
      };
      this.authService.saveUser(obj).subscribe(
        (_response) => {
          this.snackBar.open('User successfully created', 'Close', { duration: 5000 });
          this.submitted = false;
          this.router.navigate(['user-management/user']);
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
