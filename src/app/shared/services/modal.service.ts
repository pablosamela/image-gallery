import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { ImageComponent } from 'src/app/components/image/image.component';

import { IImageSummary } from '../models/image-summary';

@Injectable({
	providedIn: 'root',
})
export class ModalService {
	constructor(public dialog: MatDialog) {}

	openImageDialog(imageSummary: IImageSummary): void {
		const dialogRef = this.dialog.open(ImageComponent, {
			panelClass: ['image-dialog', 'md:w-3/5', 'w-full'],
			maxHeight: '85vh',
			data: imageSummary,
		});

		dialogRef.afterClosed().subscribe();
	}
}
