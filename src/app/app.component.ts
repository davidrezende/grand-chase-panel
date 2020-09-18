import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { OktaAuthService } from '@okta/okta-angular';
import {ToastyConfig } from 'ng2-toasty';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'GC Panel';

  constructor(
    private router : Router,
    private toastyConfig: ToastyConfig
  ) {
    this.toastyConfig.theme='bootstrap';
  }

  showNavBar(){
    return this.router.url !== '/login';
  }

  async ngOnInit() {
    console.log("url no navegador>" + this.router.url);
    if(this.router.url == '/'){
      this.router.navigate(['/login']);
    }
    // this.isAuthenticated = await this.oktaAuth.isAuthenticated();
    // this.oktaAuth.$authenticationState.subscribe(
    //   (isAuthenticated: boolean)  => this.isAuthenticated = isAuthenticated
    // );
  }
}
