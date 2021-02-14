import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  angForm = new FormGroup({
    username: new FormControl("", [Validators.required, Validators.minLength(2)]),   
    password: new FormControl("", [Validators.required, Validators.minLength(4)]),   
  });
  
  constructor(private _auth : AuthService,private _router:Router) {      
  }

  ngOnInit(): void {
  }

  onSubmit(){
    this._auth.register(this.angForm.value).subscribe((e) => e ? this._router.navigateByUrl("/login") : 0);
  }

}
