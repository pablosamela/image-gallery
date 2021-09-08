export interface IImageSummary {
	id: string;
	cropped_picture: string;
}

export interface IImageListResponse {
	hasMore: boolean;
	page: number;
	pageCount: number;
	pictures: IImageSummary[];
}
