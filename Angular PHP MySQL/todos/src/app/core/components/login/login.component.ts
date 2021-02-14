import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  angForm = new FormGroup({
    username: new FormControl("", [Validators.required, Validators.minLength(2)]),   
    password: new FormControl("", [Validators.required, Validators.minLength(4)]),   
  });

  constructor(private authService : AuthService, private router:Router) { }

  ngOnInit(): void {
  }

  onSubmit(){
    this.authService.login(this.angForm.value).subscribe(
      (res)=>
      {
        if(res) {
          console.log(res);
          this.router.navigate(["/"]);
        }
      },
    (error: HttpErrorResponse) =>
    {         
      console.log(error)      
    }
  )
  }

}
