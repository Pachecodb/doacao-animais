import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../user/user';

@Injectable({providedIn: 'root'})
export class AuthenticationService {

	private uri = 'http://localhost:8080/doacao/api/users/login';

	constructor(private http: HttpClient){}

	async login(user: User){

		return await this.http.post<User>(this.uri, user).toPromise()
		.then(res => {
			delete res.id;
			delete res.password;
			localStorage.setItem('currentUser', JSON.stringify(res));

		})
	}

	logout(){
		localStorage.removeItem('currentUser');
	}

	getToken(){
		const currentUser = localStorage.getItem('currentUser');
		if(currentUser){
			return JSON.parse(currentUser).token;
		}
	}
	isLogged(){
		return true;
	}
}