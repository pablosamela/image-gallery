import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';

import { ModalService } from 'src/app/shared/services/modal.service';

import { IImageSummary } from '../../shared/models/image-summary';
import { DataService } from '../../shared/services/data.service';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.sass'],
})
export class HomeComponent implements OnInit {
	imageList$: Observable<IImageSummary[]> = of([]);
	authorized$: Observable<boolean> = of(false);

	constructor(private dataservice: DataService, private modalService: ModalService) {}

	ngOnInit(): void {
		this.imageList$ = this.dataservice.getImageList(0, 12);
	}

	getImages(from: number, amount: number): void {
		this.imageList$ = this.dataservice.getImageList(from, amount);
	}

	onImageClick(imageSummary: IImageSummary): void {
		this.modalService.openImageDialog(imageSummary);
	}
}
