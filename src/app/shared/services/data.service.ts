import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IImage } from '../models/image';
import { IImageListResponse, IImageSummary } from '../models/image-summary';

@Injectable({
	providedIn: 'root',
})
export class DataService {
	readonly API_URL = 'http://interview.agileengine.com:80';

	constructor(private http: HttpClient) {}

	getImageList(page: number, limit: number): Observable<IImageSummary[]> {
		const pager = page && limit ? `?page=${page}&limit=${limit}` : '';
		return this.http.get<IImageListResponse>(`${this.API_URL}/images${pager}`).pipe(map(response => response.pictures));
	}

	getImage(id: string): Observable<IImage> {
		return this.http.get<IImage>(`${this.API_URL}/images/${id}`);
	}
}
