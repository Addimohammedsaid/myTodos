import { Component } from '@angular/core';
import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'todos';

  constructor(private dataService: AuthService) {

    //dataService.getLoggedInName.subscribe(name => this.changeName(name));

    if(this.dataService.isLoggedIn()) console.log("loggedin");        

    }    
}
