import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ErrorComponent} from '../error/error.component';
import {AuthenticationService} from '../auth/authentication.service';
import { User } from '../user/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  login = '';
  password = '';
  returnUrl: string;

  constructor(private dialog: MatDialog, private router: Router, private formBuilder: FormBuilder,
              private route: ActivatedRoute, private authenticationService: AuthenticationService) {
  }

  ngOnInit() {

    this.loginForm = this.formBuilder.group({
      login: ['', Validators.required],
      password: ['', Validators.required]
    });

    // reset login status
    this.authenticationService.logout();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  doLogin() {

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
	}
	
	let user = new  User ();
	user.login = this.loginForm.controls.login.value;
	user.password = this.loginForm.controls.password.value;

    this.authenticationService.login(user)
      .then(data => {
		this.router.navigate([this.returnUrl]);
		this.router.navigate(['animal-list']);
      })
      .catch(error => {
        console.log(error);
        this.dialog.open(ErrorComponent, {data: {message: 'Login incorreto!'}});
      })
  }

}
