import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  user:any;

  constructor(private authService : AuthService, private route: ActivatedRoute,) {    
    const userId = this.authService.getUser();
     this.user = JSON.parse(userId || "");
  }

  ngOnInit(): void {
  }

}
