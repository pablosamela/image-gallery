import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { filter, map, catchError } from 'rxjs/operators';

import { IAuthResponse } from '../models/auth-response';

@Injectable({
	providedIn: 'root',
})
export class AuthenticateService {
	readonly API_URL = 'http://interview.agileengine.com:80';
	readonly apiKey = '23567b218376f79d9415';
	// private refreshTokenTimeout: Timeout | undefined;

	constructor(private http: HttpClient) {}

	signIn(): Observable<boolean> {
		return this.http.post<IAuthResponse>(`${this.API_URL}/auth`, { apiKey: this.apiKey }).pipe(
			filter(response => !!response.token),
			map(response => {
				localStorage.setItem('token', response.token);
				return response.auth;
			}),
			catchError(error => {
				if (error instanceof HttpErrorResponse) {
					if (error.status === 403) {
						// 'Not authorized'
					} else if (error.status === 500) {
						// 'Server Error'
					}
				}
				return of(false); //throwError(error);
			})
		);
	}

	signOut(): void {
		localStorage.removeItem('token');
	}

	/* 
	private startRefreshTokenTimer() {
		// parse json object from base64 encoded jwt token
		const jwtToken = JSON.parse(atob(this.userValue.jwtToken.split('.')[1]));

		// set a timeout to refresh the token a minute before it expires
		const expires = new Date(jwtToken.exp * 1000);
		const timeout = expires.getTime() - Date.now() - 60 * 1000;
		this.refreshTokenTimeout = setTimeout(() => this.signIn().subscribe(), timeout);
	}

	private stopRefreshTokenTimer() {
		clearTimeout(this.refreshTokenTimeout);
	}
	*/
}
