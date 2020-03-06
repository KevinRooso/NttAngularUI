import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { FormGroup, FormControlName, FormControl } from '@angular/forms';
import { AuthServiceService } from '../auth-service.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router,private authService:AuthServiceService) { }

  loginform = new FormGroup({
    usernameOrEmail: new FormControl(''),
    password: new FormControl('')
  })

  ngOnInit(): void {
  }
  onSubmit() : void {
    //this.router.navigate(['events']);
    console.log(this.loginform.value);
    this.authService.getAuthourized(this.loginform.value).subscribe(
      res=>{
        localStorage.setItem("token",res.body.accessToken);
        console.log(res.body.accessToken);
        this.router.navigate(['events']);
  })
}
}
