import { Component, OnInit } from '@angular/core';
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

  constructor(private router: Router,private authService:AuthServiceService,
    public snackBar: MatSnackBar) { }

  loginform = new FormGroup({
    usernameOrEmail: new FormControl('', [Validators.required, Validators.pattern('a-zA-z0-9')],),
    password: new FormControl('', [Validators.required, Validators.minLength(3)])
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
  }
  )
}
}
