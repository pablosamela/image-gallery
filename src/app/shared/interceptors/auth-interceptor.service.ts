import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
	providedIn: 'root',
})
export class AuthInterceptorService implements HttpInterceptor {
	intercept(request: HttpRequest<any>, next: HttpHandler) {
		const token: string = localStorage.getItem('token') || '';
		request = request.clone({ headers: request.headers.set('Authorization', `Bearer ${token}`) });
		request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
		request = request.clone({ headers: request.headers.set('Accept', 'application/json') });

		return next.handle(request).pipe(
			catchError((error: HttpErrorResponse) => {
				if (error && error.status === 401) {
					// 'ERROR 401 UNAUTHORIZED';
				}
				const err = error.error.message || error.statusText;
				return throwError(err);
			})
		);
	}
}
