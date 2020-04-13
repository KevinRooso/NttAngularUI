import { Component, OnInit, Pipe } from '@angular/core';
import {Router} from '@angular/router';
import { FormGroup, FormControlName, FormControl, Validators } from '@angular/forms';
import { AuthServiceService } from '../auth-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { style } from '@angular/animations';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  show = false;
  // submitted = false;
  // loading = false;

  constructor(private router: Router,private authService:AuthServiceService,
    public snackBar: MatSnackBar) { }

  loginform = new FormGroup({
    usernameOrEmail: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-z]{2,4}$')]),
    password: new FormControl('', Validators.required)
  })

  ngOnInit(): void {
    this.show =true;
    setTimeout(()=>{
    this.show =false;
    },1000)
  }

  get f(){
    return this.loginform.controls;
}

  onSubmit() : void {
    this.show =true;

    //this.router.navigate(['events']);
    console.log(this.loginform.value);
    this.authService.getAuthourized(this.loginform.value).subscribe(
      (res)=>{
        localStorage.setItem("token",res.body.accessToken);
        console.log(res);
        this.show =false;
        this.router.navigate(['home']);
  },
  (error: HttpErrorResponse)=>
  {
    console.log(error.error.status);
    if(error.error.status=='401')
    this.snackBar.open('Please enter valid credentials', 'Close', {duration: 3500, verticalPosition: 'top'});
    this.show =false;
  }
  )
}

// onSubmit(){
//   this.submitted = true;
//   if (this.loginform.invalid) {
//     return;
//     }
//     this.loading = true;
//     this.authService.getAuthourized(this.loginform.value)
//     .pipe(first())
//     .subscribe(
//         data => {
//             this.router.navigate(['home ']);
//         },
//         error => {
//             this.alertService.error(error);
//             this.loading = false;
//         });
//       }
}
