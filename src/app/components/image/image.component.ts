import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { faDragon } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';

import { IImage } from 'src/app/shared/models/image';
import { IImageSummary } from 'src/app/shared/models/image-summary';
import { DataService } from 'src/app/shared/services/data.service';


@Component({
	selector: 'app-image',
	templateUrl: './image.component.html',
	styleUrls: ['./image.component.sass'],
})
export class ImageComponent implements OnInit {
	icons = {
		faDragon: faDragon,
	}

	image$: Observable<IImage> | undefined;

	constructor(
		public dataService: DataService,
		public dialogRef: MatDialogRef<ImageComponent>,
		@Inject(MAT_DIALOG_DATA) public data: IImageSummary
	) {}

	ngOnInit(): void {
		this.image$ = this.dataService.getImage(this.data.id);
	}

	onCloseClick(): void {
		this.dialogRef.close();
	}
}
